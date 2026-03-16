from pydantic import BaseModel, ConfigDict
from uuid import UUID
from typing import Optional
from backend.app.models.user import UserRole

class UserBase(BaseModel):
    registration_number: str
    name: str
    department: str
    role: UserRole = UserRole.STUDENT

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: UUID
    
    model_config = ConfigDict(from_attributes=True)

class User(UserInDBBase):
    pass

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    registration_number: Optional[str] = None
