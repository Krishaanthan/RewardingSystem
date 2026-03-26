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

router = APIRouter()


async def _build_claim_out(claim: Claim, db: AsyncSession) -> ClaimOut:
    activity = await db.get(Activity, claim.activity_id)
    files_result = await db.execute(
        select(ClaimFile).where(ClaimFile.claim_id == claim.id)
    )
    files = files_result.scalars().all()
    return ClaimOut(
        id=claim.id,
        activity_id=claim.activity_id,
        activity_title=activity.title if activity else "Unknown",
        activity_points=activity.points if activity else 0,
        status=claim.status,
        rejection_reason=claim.rejection_reason,
        submitted_at=claim.submitted_at,
        files=[ClaimFileOut.model_validate(f) for f in files],
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
    elif body.action == "reject":
        claim.status = ClaimStatus.REJECTED
        claim.rejection_reason = body.reason
    elif body.action == "manual_review":
        claim.status = ClaimStatus.MANUAL_REVIEW
    else:
        raise HTTPException(status_code=400, detail="action must be 'approve', 'reject', or 'manual_review'")

    await db.commit()
    return {"claim_id": str(claim_id), "status": claim.status}
