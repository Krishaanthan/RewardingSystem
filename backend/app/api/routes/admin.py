from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from uuid import UUID
import csv
from io import StringIO
from datetime import datetime, timezone
from pydantic import BaseModel

from backend.app.api.dependencies import get_current_user
from backend.app.db.session import get_db
from backend.app.models.user import User, UserRole
from backend.app.models.activity import Activity
from backend.app.models.batch_deduction import BatchDeduction
from backend.app.models.claim import Claim, ClaimStatus

router = APIRouter()

class UserRoleUpdate(BaseModel):
    role: UserRole
    assigned_faculty_id: str | None = None

class ActivityCreate(BaseModel):
    title: str
    description: str | None = None
    points: int
    badge_category: str | None = "General"

@router.get("/users")
async def get_all_users(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify admin
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")

    # Fetch users and calculate points
    users_result = await db.execute(select(User))
    users = users_result.scalars().all()

    # In a real scenario, this aggregation would be a joined query.
    # We will compute points per user manually to keep it straightforward.
    claims_result = await db.execute(
        select(Claim.student_id, func.sum(Activity.points).label("total"))
        .join(Activity, Claim.activity_id == Activity.id)
        .where(Claim.status == ClaimStatus.APPROVED)
        .group_by(Claim.student_id)
    )
    points_dict = {str(row.student_id): row.total for row in claims_result.all()}
    
    # We also need assigned Faculty names
    faculty_dict = {str(u.id): u.name for u in users if u.role == UserRole.FACULTY}

    response_users = []
    for u in users:
        faculty_name = faculty_dict.get(str(u.assigned_faculty_id)) if u.assigned_faculty_id else None
        response_users.append({
            "id": str(u.id),
            "regNo": u.registration_number,
            "initials": "".join([x[0] for x in u.name.split()[:2]]).upper()[:2],
            "name": u.name,
            "dept": u.department,
            "year": u.current_year or 1,
            "section": u.section or "A",
            "points": points_dict.get(str(u.id), 0),
            "role": u.role,
            "status": "ACTIVE",
            "assignedFaculty": faculty_name
        })

    return response_users

@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: UUID,
    body: UserRoleUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")

    user_result = await db.execute(select(User).where(User.id == user_id))
    user = user_result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.role = body.role
    if body.role == UserRole.STUDENT and body.assigned_faculty_id:
        user.assigned_faculty_id = UUID(body.assigned_faculty_id)
    elif body.role != UserRole.STUDENT:
        user.assigned_faculty_id = None

    await db.commit()
    return {"message": "Role updated successfully"}

@router.get("/faculty")
async def get_faculty_list(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")

    faculty_result = await db.execute(select(User).where(User.role == UserRole.FACULTY))
    faculty_list = faculty_result.scalars().all()

    return [{"id": str(f.id), "name": f.name, "dept": f.department} for f in faculty_list]

@router.post("/bulk-deductions")
async def bulk_deductions(
    category: str = Form(...),
    csv_file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")

    contents = await csv_file.read()
    string_data = contents.decode("utf-8")
    reader = csv.DictReader(StringIO(string_data))

    success_count = 0
    error_count = 0
    total_deducted = 0

    batch_id_str = f"BLK-{datetime.now().strftime('%Y%m%d%H%M%S')}"

    for row in reader:
        try:
            reg_no = row.get("reg_no")
            reason = row.get("reason")
            deduction_pts = int(row.get("deduction_pts", 0))

            if not reg_no or not reason or deduction_pts >= 0:
                error_count += 1
                continue

            # Find student
            student_result = await db.execute(select(User).where(User.registration_number == reg_no))
            student = student_result.scalars().first()
            if not student:
                error_count += 1
                continue

            # Create deduction activity dynamically
            deduct_activity = Activity(
                title=f"Deduction: {category[:20]}", 
                description=reason, 
                points=deduction_pts, 
                badge_category="Deduction"
            )
            db.add(deduct_activity)
            await db.flush()

            # Create Claim
            claim = Claim(
                student_id=student.id,
                activity_id=deduct_activity.id,
                status=ClaimStatus.APPROVED,
                notes=reason,
                reviewer_id=current_user.id
            )
            db.add(claim)
            success_count += 1
            total_deducted += deduction_pts

        except Exception:
            error_count += 1

    batch_log = BatchDeduction(
        admin_id=current_user.id,
        batch_id=batch_id_str,
        category=category,
        success_count=success_count,
        error_count=error_count,
        total_points_deducted=total_deducted
    )
    db.add(batch_log)
    await db.commit()

    return {
        "message": "Bulk deduction processed successfully",
        "batch_id": batch_id_str,
        "success": success_count,
        "errors": error_count,
        "total": total_deducted
    }

@router.get("/batch-deductions")
async def get_batch_deductions(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    result = await db.execute(select(BatchDeduction).order_by(BatchDeduction.created_at.desc()))
    batches = result.scalars().all()
    
    return [
        {
            "id": b.batch_id,
            "date": b.created_at.strftime("%Y-%m-%d"),
            "type": b.category,
            "success": f"{b.success_count} / {b.error_count}",
            "total": f"{b.total_points_deducted:,}",
            "status": "COMPLETED"
        }
        for b in batches
    ]

@router.get("/dashboard")
async def admin_dashboard(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    # Just a mock response for now
    return {
        "total_users": 1500,
        "total_claims": 4200,
        "active_faulty": 45,
        "pending_reviews": 120
    }

@router.get("/activities")
async def get_activities(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    result = await db.execute(select(Activity).order_by(Activity.id))
    return result.scalars().all()

@router.post("/activities")
async def create_activity(
    body: ActivityCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    activity = Activity(**body.model_dump())
    db.add(activity)
    await db.commit()
    await db.refresh(activity)
    return activity

@router.delete("/activities/{activity_id}")
async def delete_activity(
    activity_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin privileges required")
        
    result = await db.execute(select(Activity).where(Activity.id == activity_id))
    activity = result.scalars().first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
        
    await db.delete(activity)
    await db.commit()
    return {"message": "Activity deleted successfully"}
