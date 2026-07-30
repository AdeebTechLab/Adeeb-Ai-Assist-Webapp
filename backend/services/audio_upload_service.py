import os
import shutil
from fastapi import UploadFile

UPLOAD_FOLDER = "backend/uploads/live_audio"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True,
)


def save_live_audio(file: UploadFile):
    """
    Save recorded meeting audio.
    """

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename,
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    return {
        "filename": file.filename,
        "path": file_path,
    }