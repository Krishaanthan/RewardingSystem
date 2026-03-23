from sqlalchemy import Column, Integer, String
from backend.app.db.base import Base


class Badge(Base):
    """
    Badge tier thresholds per badge category.

    Algorithm (derived from frontend badges page):
    - Tiered badges: Bronze=1, Silver=3, Gold=5, Diamond=8 approved activities
      in the same badge_category.
    - Special/individual badges (academic-excellence, global-explorer,
      startup-founder) are awarded when the matching activity is approved
      (threshold = 1, and the badge is flagged is_individual=True).
    """
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True, index=True)
    # Matches Activity.badge_category, e.g. "knowledge-seeker"
    badge_category = Column(String, nullable=False, index=True)
    badge_name = Column(String, nullable=False)          # e.g. "Knowledge Seeker"
    tier = Column(String, nullable=False)                # Bronze | Silver | Gold | Diamond | Special
    required_activities = Column(Integer, nullable=False)  # count of approved activities in this category
    emoji = Column(String, nullable=True)
    is_individual = Column(Integer, default=0)           # 1 = special/standalone badge
