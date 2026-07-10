import io
import fitz  # PyMuPDF
from PIL import Image

def compress_file(file_content: bytes, content_type: str, filename: str) -> tuple[bytes, str, str]:
    """
    Compresses the file if it's an image or PDF.
    Returns a tuple of (compressed_bytes, new_content_type, new_filename).
    Non-compressible files are returned as-is.
    """
    # 1. Compress Images
    if content_type.startswith('image/') or filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        # Skip compressing GIFs as it might ruin animations
        if content_type == 'image/gif':
            return file_content, content_type, filename
            
        try:
            img = Image.open(io.BytesIO(file_content))
            
            # Convert RGBA to RGB for JPEG compatibility, or we can just save as WebP
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
                
            output = io.BytesIO()
            # Save as optimized JPEG with 80% quality
            img.save(output, format="JPEG", optimize=True, quality=80)
            
            compressed_bytes = output.getvalue()
            
            # Replace extension with .jpg
            name_part = filename.rsplit('.', 1)[0]
            new_filename = f"{name_part}.jpg"
            
            return compressed_bytes, "image/jpeg", new_filename
        except Exception as e:
            print(f"Image compression failed: {e}")
            return file_content, content_type, filename
            
    # 2. Compress PDFs
    elif content_type == 'application/pdf' or filename.lower().endswith('.pdf'):
        try:
            # Open PDF from memory
            pdf_doc = fitz.open(stream=file_content, filetype="pdf")
            
            # Save with compression options
            # deflate=True, garbage=4 removes unused objects and deflates streams
            compressed_bytes = pdf_doc.write(
                garbage=4, 
                deflate=True, 
                clean=True
            )
            
            pdf_doc.close()
            return compressed_bytes, content_type, filename
        except Exception as e:
            print(f"PDF compression failed: {e}")
            return file_content, content_type, filename
            
    # 3. Pass through other files
    return file_content, content_type, filename
