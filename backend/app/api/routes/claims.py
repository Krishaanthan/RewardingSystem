"""
Manual test + status-update endpoints for claims.

PUT /api/claims/{claim_id}/test-approve        → APPROVED
PUT /api/claims/{claim_id}/test-reject          → REJECTED  (optional reason in body)
PUT /api/claims/{claim_id}/test-manual-review   → MANUAL_REVIEW
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from uuid import UUID
from pydantic import BaseModel
from typing import Optional

from backend.app.db.session import get_db
from backend.app.models.claim import Claim, ClaimStatus

router = APIRouter()


class RejectBody(BaseModel):
    reason: Optional[str] = None


async def _get_claim_or_404(claim_id: UUID, db: AsyncSession) -> Claim:
    result = await db.execute(select(Claim).where(Claim.id == claim_id))
    claim = result.scalars().first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim


@router.put("/{claim_id}/test-approve")
async def test_approve(claim_id: UUID, db: AsyncSession = Depends(get_db)):
    claim = await _get_claim_or_404(claim_id, db)
    claim.status = ClaimStatus.APPROVED
    claim.rejection_reason = None
    await db.commit()
    return {"claim_id": str(claim_id), "status": claim.status}


@router.put("/{claim_id}/test-reject")
async def test_reject(claim_id: UUID, body: RejectBody = RejectBody(), db: AsyncSession = Depends(get_db)):
    claim = await _get_claim_or_404(claim_id, db)
    claim.status = ClaimStatus.REJECTED
    claim.rejection_reason = body.reason
    await db.commit()
    return {"claim_id": str(claim_id), "status": claim.status, "reason": body.reason}


@router.put("/{claim_id}/test-manual-review")
async def test_manual_review(claim_id: UUID, db: AsyncSession = Depends(get_db)):
    claim = await _get_claim_or_404(claim_id, db)
    claim.status = ClaimStatus.MANUAL_REVIEW
    claim.rejection_reason = None
    await db.commit()
    return {"claim_id": str(claim_id), "status": claim.status}
