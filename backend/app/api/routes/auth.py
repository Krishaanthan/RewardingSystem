from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.schemas.user_schema import UserCreate, User as UserSchema, Token
from backend.app.core.security import get_password_hash, verify_password, create_access_token
from pydantic import BaseModel

router = APIRouter()

class StudentLogin(BaseModel):
    registration_number: str
    password: str

@router.post("/register", response_model=UserSchema)
async def register_student(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if user already exists
    result = await db.execute(
        select(User).filter(User.registration_number == user_in.registration_number)
    )
    user = result.scalars().first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this registration number already exists in the system.",
        )
    
    db_obj = User(
        registration_number=user_in.registration_number,
        password_hash=get_password_hash(user_in.password),
        name=user_in.name,
        department=user_in.department,
        role=user_in.role,
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.post("/login", response_model=Token)
async def login_student(login_data: StudentLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).filter(User.registration_number == login_data.registration_number)
    )
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect registration number or password")
    
    if not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect registration number or password")
    
    access_token = create_access_token(subject=user.registration_number)
    return {"access_token": access_token, "token_type": "bearer"}
