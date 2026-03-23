from pydantic import BaseModel, ConfigDict
from typing import Optional


class ActivityOut(BaseModel):
    id: int
    title: str
    points: int
    required_proof_types: list[str]
    badge_category: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
