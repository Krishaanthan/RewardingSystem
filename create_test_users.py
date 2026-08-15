import asyncio
from backend.app.db.session import SessionLocal
from backend.app.models.user import User, UserRole
from backend.app.core.security import get_password_hash
from sqlalchemy.future import select

async def main():
    async with SessionLocal() as db:
        admin_id = "admin"
        faculty_id = "faculty1"
        
        # Check Admin
        res = await db.execute(select(User).where(User.registration_number == admin_id))
        admin_user = res.scalars().first()
        if not admin_user:
            admin_user = User(
                registration_number=admin_id,
                password_hash=get_password_hash("password123"),
                name="System Administrator",
                department="Admin Block",
                role=UserRole.ADMIN
            )
            db.add(admin_user)
        
        # Check Faculty
        res = await db.execute(select(User).where(User.registration_number == faculty_id))
        faculty_user = res.scalars().first()
        if not faculty_user:
            faculty_user = User(
                registration_number=faculty_id,
                password_hash=get_password_hash("password123"),
                name="Dr. Ramesh Kumar",
                department="Computer Science",
                role=UserRole.FACULTY
            )
            db.add(faculty_user)
            
        await db.commit()
        print("Test users recreated.")

if __name__ == "__main__":
    asyncio.run(main())
