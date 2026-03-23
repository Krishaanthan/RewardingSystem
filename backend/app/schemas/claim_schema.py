from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional
from backend.app.models.claim import ClaimStatus


class ClaimFileOut(BaseModel):
    id: UUID
    file_path: str
    file_type: str

    model_config = ConfigDict(from_attributes=True)


class ClaimOut(BaseModel):
    id: UUID
    activity_id: int
    activity_title: str
    activity_points: int
    status: ClaimStatus
    rejection_reason: Optional[str] = None
    submitted_at: datetime
    files: list[ClaimFileOut] = []

    model_config = ConfigDict(from_attributes=True)


class ClaimStatusUpdate(BaseModel):
    """Used by faculty / test endpoints to update a claim's status."""
    action: str   # "approve" | "reject" | "manual_review"
    reason: Optional[str] = None
