"""
Storage service — saves uploaded files to Supabase Storage.
"""
from fastapi import UploadFile
from supabase import create_client, Client
from backend.app.core.config import settings

def get_supabase_client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

async def save_upload_file(reg_no: str, activity_title: str, file_type: str, file: UploadFile) -> str:
    """Save an UploadFile to Supabase and return its public URL."""
    contents = await file.read()
    
    from backend.app.services.compression import compress_file
    
    # Compress the file in-memory
    compressed_bytes, new_content_type, new_filename = compress_file(
        file_content=contents,
        content_type=file.content_type,
        filename=file.filename or "file"
    )
    
    # Sanitize inputs
    safe_activity_title = "".join(c for c in activity_title if c.isalnum() or c in ("-", "_", " ")).strip()
    safe_file_type = "".join(c for c in file_type if c.isalnum() or c in ("-", "_")).strip()
    safe_name = "".join(c for c in new_filename if c.isalnum() or c in (".", "-", "_"))
    
    # Construct path: ActivityTitle/ProofType/RegNo_Filename
    dest_name = f"{reg_no}_{safe_name}"
    dest_path = f"{safe_activity_title}/{safe_file_type}/{dest_name}"
    
    supabase = get_supabase_client()
    bucket_name = "Proof_Submissons"
    
    # Upload to Supabase
    supabase.storage.from_(bucket_name).upload(
        file=compressed_bytes,
        path=dest_path,
        file_options={"content-type": new_content_type, "upsert": "true"}
    )

    # Return the public URL
    public_url = supabase.storage.from_(bucket_name).get_public_url(dest_path)
    return public_url
