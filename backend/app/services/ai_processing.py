"""
Dummy AI processing background task.

In production this would run OCR / ML inference on the uploaded files.
For now it simply waits 5 seconds and logs a message.  Status is NOT
changed automatically — manual SQL updates are used for testing:

    UPDATE claims SET status = 'APPROVED'       WHERE id = '<uuid>';
    UPDATE claims SET status = 'MANUAL_REVIEW'  WHERE id = '<uuid>';
    UPDATE claims SET status = 'REJECTED'       WHERE id = '<uuid>';
"""
import asyncio
import logging
from uuid import UUID

logger = logging.getLogger("ai_processing")


async def ocr_verification_script(claim_id: UUID) -> None:
    await asyncio.sleep(5)
    logger.info(f"[AI] Processing files for claim {claim_id} — awaiting manual update.")
