import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.app.api.routes import auth, student, claims, faculty
from backend.app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth routes
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])

# Student routes
app.include_router(student.router, prefix=f"{settings.API_V1_STR}/student", tags=["student"])

# Claim management (test/admin endpoints)
app.include_router(claims.router, prefix=f"{settings.API_V1_STR}/claims", tags=["claims"])

# Faculty review routes
app.include_router(faculty.router, prefix=f"{settings.API_V1_STR}/faculty", tags=["faculty"])


@app.get("/")
async def root():
    return {"message": "Welcome to RDSYS API"}

# Serve uploaded proof files
_storage_dir = os.path.join(os.getcwd(), "storage")
os.makedirs(_storage_dir, exist_ok=True)
app.mount("/storage", StaticFiles(directory=_storage_dir), name="storage")
