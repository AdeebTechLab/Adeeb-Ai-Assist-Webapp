import os
import shutil
from fastapi import UploadFile


UPLOAD_FOLDER = "backend/uploads/audio"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def save_audio(file: UploadFile):
    """
    Save uploaded audio file.
    """

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "path": file_path,
    }