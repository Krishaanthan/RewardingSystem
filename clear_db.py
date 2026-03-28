import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.db.session import SessionLocal
from backend.app.models.claim import ClaimFile, Claim
from backend.app.models.user import User
from backend.app.models.activity import Activity
from sqlalchemy import text

async def clear_db():
    async with SessionLocal() as db:
        print("Clearing claims, claim files and users...")
        await db.execute(text("TRUNCATE TABLE claim_files CASCADE"))
        await db.execute(text("TRUNCATE TABLE claims CASCADE"))
        await db.execute(text("TRUNCATE TABLE users CASCADE"))
        await db.commit()
        print("Done truncating variable user data.")

if __name__ == "__main__":
    asyncio.run(clear_db())
