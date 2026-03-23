"""
Storage service — saves uploaded files to the local filesystem.

Files land at: ./storage/{reg_no}/{activity_id}/{file_type}_{original_filename}
The returned path is relative to the repo root so it is portable.
"""
import os
from fastapi import UploadFile


BASE_STORAGE = "storage"


async def save_upload_file(reg_no: str, activity_id: int, file_type: str, file: UploadFile) -> str:
    """Save an UploadFile and return its relative path."""
    folder = os.path.join(BASE_STORAGE, str(reg_no), str(activity_id))
    os.makedirs(folder, exist_ok=True)

    # Sanitise the original filename
    safe_name = "".join(c for c in (file.filename or "file") if c.isalnum() or c in (".", "-", "_"))
    dest_name = f"{file_type}_{safe_name}"
    dest_path = os.path.join(folder, dest_name)

    contents = await file.read()
    with open(dest_path, "wb") as f:
        f.write(contents)

    return dest_path
