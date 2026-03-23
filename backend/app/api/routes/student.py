"""
Student-facing routes
=====================
POST /api/student/submit-claim        — Multi-file claim submission
GET  /api/student/activities          — List all activities
GET  /api/student/claim-statuses      — All claims for logged-in student
GET  /api/student/approved-activities — Only APPROVED claims with points
GET  /api/student/profile             — Points total + earned badges
"""

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from uuid import UUID
from collections import defaultdict

from backend.app.api.dependencies import get_current_user
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.activity import Activity
from backend.app.models.claim import Claim, ClaimFile, ClaimStatus
from backend.app.schemas.activity_schema import ActivityOut
from backend.app.schemas.claim_schema import ClaimOut, ClaimFileOut
from backend.app.services.storage import save_upload_file
from backend.app.services.ai_processing import ocr_verification_script
from backend.app.services.badge_engine import compute_all_badges

router = APIRouter()


# ---------------------------------------------------------------------------
# Helper: build a ClaimOut from ORM objects
# ---------------------------------------------------------------------------

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


# ---------------------------------------------------------------------------
# GET /api/student/activities
# ---------------------------------------------------------------------------

@router.get("/activities", response_model=list[ActivityOut])
async def list_activities(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Activity).order_by(Activity.title))
    return result.scalars().all()


# ---------------------------------------------------------------------------
# POST /api/student/submit-claim
# Multi-part form: activity_id (int) + one or more file/link fields.
# Each file field must be named as the proof type:
#   e.g. "Certificate", "Event_Poster", "OD_Letter"
# Each text field whose name ends with "_link" is stored as a ClaimFile
#   with file_type = field_name and file_path = the URL value.
# ---------------------------------------------------------------------------

@router.post("/submit-claim", status_code=201)
async def submit_claim(
    background_tasks: BackgroundTasks,
    activity_id: int = Form(...),
    files: list[UploadFile] = File(default=[]),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verify activity exists
    activity = await db.get(Activity, activity_id)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    # Create the claim record
    claim = Claim(
        student_id=current_user.id,
        activity_id=activity_id,
        status=ClaimStatus.AI_PROCESSING,
    )
    db.add(claim)
    await db.flush()  # get claim.id before adding files

    # Save uploaded files
    for upload in files:
        # Use filename stem as file_type (frontend should name fields clearly)
        file_type = upload.filename.rsplit(".", 1)[0] if upload.filename else "Proof"
        saved_path = await save_upload_file(
            reg_no=current_user.registration_number,
            activity_id=activity_id,
            file_type=file_type,
            file=upload,
        )
        db.add(ClaimFile(claim_id=claim.id, file_path=saved_path, file_type=file_type))

    await db.commit()
    await db.refresh(claim)

    # Trigger the dummy AI background task
    background_tasks.add_task(ocr_verification_script, claim.id)

    return {
        "claim_id": str(claim.id),
        "status": claim.status,
        "message": "Submission received. AI is processing your files.",
    }


# ---------------------------------------------------------------------------
# GET /api/student/claim-statuses
# ---------------------------------------------------------------------------

@router.get("/claim-statuses", response_model=list[ClaimOut])
async def claim_statuses(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Claim)
        .where(Claim.student_id == current_user.id)
        .order_by(Claim.submitted_at.desc())
    )
    claims = result.scalars().all()
    return [await _build_claim_out(c, db) for c in claims]


# ---------------------------------------------------------------------------
# GET /api/student/approved-activities
# ---------------------------------------------------------------------------

@router.get("/approved-activities", response_model=list[ClaimOut])
async def approved_activities(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Claim)
        .where(Claim.student_id == current_user.id, Claim.status == ClaimStatus.APPROVED)
        .order_by(Claim.submitted_at.desc())
    )
    claims = result.scalars().all()
    return [await _build_claim_out(c, db) for c in claims]


# ---------------------------------------------------------------------------
# GET /api/student/profile
# Returns total points + all earned badges
# ---------------------------------------------------------------------------

@router.get("/profile")
async def student_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Fetch all approved claims
    result = await db.execute(
        select(Claim, Activity)
        .join(Activity, Claim.activity_id == Activity.id)
        .where(Claim.student_id == current_user.id, Claim.status == ClaimStatus.APPROVED)
    )
    rows = result.all()

    total_points = 0
    category_counts: dict[str, int] = defaultdict(int)

    for claim, activity in rows:
        total_points += activity.points
        if activity.badge_category:
            category_counts[activity.badge_category] += 1

    earned_badges = compute_all_badges(dict(category_counts))

    return {
        "student_id": str(current_user.id),
        "name": current_user.name,
        "registration_number": current_user.registration_number,
        "department": current_user.department,
        "total_points": total_points,
        "badges": earned_badges,
    }
