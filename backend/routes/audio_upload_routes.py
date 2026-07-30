from fastapi import APIRouter, UploadFile, File

from backend.services.audio_upload_service import save_live_audio

router = APIRouter(
    prefix="/audio",
    tags=["Audio Upload"],
)


@router.post("/upload")
def upload_audio(
    file: UploadFile = File(...),
):
    result = save_live_audio(file)

    return {
        "success": True,
        "message": "Audio uploaded successfully.",
        "data": result,
    }