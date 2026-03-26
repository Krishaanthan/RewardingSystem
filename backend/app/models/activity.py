from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from backend.app.db.base import Base


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, nullable=False, index=True)
    points = Column(Integer, nullable=False)
    # e.g. ["Certificate PDF", "Event Poster", "OD Letter"]
    required_proof_types = Column(ARRAY(String), nullable=False, default=list)
    # Badge category this activity counts towards (for badge algorithm)
    badge_category = Column(String, nullable=True)
