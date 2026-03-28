import uuid
import enum
from datetime import datetime, timezone

from sqlalchemy import Column, Enum, ForeignKey, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from backend.app.db.base import Base


class ClaimStatus(str, enum.Enum):
    AI_PROCESSING = "AI_PROCESSING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    MANUAL_REVIEW = "MANUAL_REVIEW"


class Claim(Base):
    __tablename__ = "claims"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    activity_id = Column(ForeignKey("activities.id"), nullable=False)
    status = Column(Enum(ClaimStatus), default=ClaimStatus.AI_PROCESSING, nullable=False)
    rejection_reason = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    reviewer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    submitted_at = Column(DateTime, default=lambda: datetime.now(timezone.utc).replace(tzinfo=None), nullable=False)


class ClaimFile(Base):
    __tablename__ = "claim_files"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    claim_id = Column(UUID(as_uuid=True), ForeignKey("claims.id"), nullable=False)
    # Relative path: storage/{reg_no}/{activity_id}/{file_type}_{filename}
    file_path = Column(String, nullable=False)
    # e.g. "Certificate", "Event Poster", "OD Letter", "GitHub Link"
    file_type = Column(String, nullable=False)
