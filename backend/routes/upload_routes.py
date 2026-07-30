import os
import shutil

from fastapi import APIRouter, File, UploadFile, Depends
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.services.ai_service import process_audio
from backend.services.meeting_service import save_meeting

router = APIRouter(
    prefix="/upload",
    tags=["Meeting AI"]
)

UPLOAD_FOLDER = "backend/uploads/audio"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/")
async def upload_audio(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = process_audio(file_path)

    meeting = save_meeting(
        db=db,
        filename=file.filename,
        transcript=result["transcript"],
        summary=result["summary"],
        action_items=result["action_items"]
    )

    return {
        "message": "Meeting processed successfully",
        "meeting_id": meeting.id,
        "data": result
    }