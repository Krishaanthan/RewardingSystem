"""
Faculty review routes
=====================
GET /api/faculty/review-queue                   — Claims in MANUAL_REVIEW
PUT /api/faculty/claims/{claim_id}/review       — Approve or reject with reason
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from uuid import UUID

from backend.app.api.dependencies import get_current_user
from backend.app.db.session import get_db
from backend.app.models.claim import Claim, ClaimFile, ClaimStatus
from backend.app.models.activity import Activity
from backend.app.models.user import User
from backend.app.schemas.claim_schema import ClaimOut, ClaimFileOut, ClaimStatusUpdate
from pydantic import BaseModel
from datetime import datetime, timezone

router = APIRouter()

class DirectAwardRequest(BaseModel):
    registration_number: str
    reason: str
    points: int


async def _build_claim_out(claim: Claim, db: AsyncSession) -> ClaimOut:
    activity = await db.get(Activity, claim.activity_id)
    student = await db.get(User, claim.student_id)
    files_result = await db.execute(
        select(ClaimFile).where(ClaimFile.claim_id == claim.id)
    )
    files = files_result.scalars().all()
    reviewer = await db.get(User, claim.reviewer_id) if claim.reviewer_id else None
    return ClaimOut(
        id=claim.id,
        activity_id=claim.activity_id,
        activity_title=activity.title if activity else "Unknown",
        activity_points=activity.points if activity else 0,
        status=claim.status,
        rejection_reason=claim.rejection_reason,
        submitted_at=claim.submitted_at,
        files=[ClaimFileOut.model_validate(f) for f in files],
        student_name=student.name if student else "Unknown",
        student_reg_no=student.registration_number if student else "Unknown",
        student_dept=student.department if student else "Unknown",
        reviewer_name=reviewer.name if reviewer else None
    )


@router.get("/review-queue", response_model=list[ClaimOut])
async def review_queue(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Claim)
        .where(Claim.status == ClaimStatus.MANUAL_REVIEW)
        .order_by(Claim.submitted_at.asc())
    )
    claims = result.scalars().all()
    return [await _build_claim_out(c, db) for c in claims]


@router.get("/dashboard-summary")
async def dashboard_summary(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Pending Reviews
    pending_res = await db.execute(select(Claim).where(Claim.status == ClaimStatus.MANUAL_REVIEW))
    pending_count = len(pending_res.scalars().all())

    # Manually Reviewed by this faculty
    reviewed_res = await db.execute(select(Claim).where(Claim.reviewer_id == current_user.id))
    reviewed_claims = reviewed_res.scalars().all()
    reviewed_count = len(reviewed_claims)

    # Recent Activity (last 5 reviewed, just as an example for the table)
    recent_activity = []
    for c in sorted(reviewed_claims, key=lambda x: x.submitted_at, reverse=True)[:5]:
        student = await db.get(User, c.student_id)
        activity = await db.get(Activity, c.activity_id)
        recent_activity.append({
            "student": f"{student.name} / {student.registration_number}" if student else "Unknown",
            "activity": activity.title if activity else "Unknown",
            "status": c.status,
            "time": c.submitted_at.isoformat() if c.submitted_at else ""
        })

    return {
        "pending_reviews": pending_count,
        "manually_reviewed": reviewed_count,
        "ai_approved": 0, # Placeholder
        "direct_awards": len([c for c in reviewed_claims if c.notes and "Direct Award" in c.notes]),
        "recent_activity": recent_activity
    }


@router.put("/claims/{claim_id}/review")
async def review_claim(
    claim_id: UUID,
    body: ClaimStatusUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Claim).where(Claim.id == claim_id))
    claim = result.scalars().first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    if body.action == "approve":
        claim.status = ClaimStatus.APPROVED
        claim.rejection_reason = None
        claim.reviewer_id = current_user.id
    elif body.action == "reject":
        claim.status = ClaimStatus.REJECTED
        claim.rejection_reason = body.reason
        claim.reviewer_id = current_user.id
    elif body.action == "manual_review":
        claim.status = ClaimStatus.MANUAL_REVIEW
        claim.reviewer_id = None
    else:
        raise HTTPException(status_code=400, detail="action must be 'approve', 'reject', or 'manual_review'")

    await db.commit()
    return {"claim_id": str(claim_id), "status": claim.status}

@router.post("/direct-award")
async def direct_award(
    body: DirectAwardRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Find student
    student_result = await db.execute(select(User).where(User.registration_number == body.registration_number))
    student = student_result.scalars().first()
    if not student:
        raise HTTPException(status_code=404, detail="Student logic not found")

    # For direct awards, we can create an ad-hoc Activity or use an existing one if needed.
    # To keep it simple, let's see if a "Direct Award" activity exists, if not create it.
    activity_result = await db.execute(select(Activity).where(Activity.title == "Direct Award"))
    activity = activity_result.scalars().first()
    if not activity:
        activity = Activity(title="Direct Award", description="Points awarded directly by faculty.", points=0, badge_category="General")
        db.add(activity)
        await db.flush()
    
    # We will override the points manually or just let the activity dictate it? 
    # Since direct awards can have variable points, we might need a generic activity and store points? 
    # Wait, Activity model has fixed points. So maybe we create an Activity per direct award?
    # Yes, dynamically create an Activity for this specific direct award to hold the custom point amount.
    award_activity = Activity(
        title=f"Direct Award: {body.reason[:30]}", 
        description=body.reason, 
        points=body.points, 
        badge_category="None"
    )
    db.add(award_activity)
    await db.flush()

    # Create Claim
    claim = Claim(
        student_id=student.id,
        activity_id=award_activity.id,
        status=ClaimStatus.APPROVED,
        notes=body.reason,
        reviewer_id=current_user.id,
        submitted_at=datetime.now(timezone.utc).replace(tzinfo=None)
    )
    db.add(claim)
    await db.commit()
    await db.refresh(claim)

    return {"message": "Points directly awarded successfully.", "claim_id": str(claim.id)}

@router.get("/audit-log", response_model=list[ClaimOut])
async def audit_log(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Returns claims that were reviewed/approved/rejected by this faculty member
    result = await db.execute(
        select(Claim)
        .where(Claim.reviewer_id == current_user.id)
        .order_by(Claim.submitted_at.desc())
    )
    claims = result.scalars().all()
    return [await _build_claim_out(c, db) for c in claims]
