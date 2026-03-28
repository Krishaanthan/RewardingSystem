import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from backend.app.db.base import Base

class BatchDeduction(Base):
    __tablename__ = "batch_deductions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    batch_id = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, nullable=False)
    success_count = Column(Integer, default=0)
    error_count = Column(Integer, default=0)
    total_points_deducted = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc).replace(tzinfo=None), nullable=False)
