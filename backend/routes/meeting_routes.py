from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.schemas.meeting import MeetingResponse
from backend.services.meeting_service import (
    get_all_meetings,
    get_meeting,
    delete_meeting
)

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)


@router.get("/", response_model=list[MeetingResponse])
def all_meetings(
    db: Session = Depends(get_db)
):
    return get_all_meetings(db)


@router.get("/{meeting_id}", response_model=MeetingResponse)
def one_meeting(
    meeting_id: int,
    db: Session = Depends(get_db)
):
    meeting = get_meeting(meeting_id, db)

    if meeting is None:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return meeting


@router.delete("/{meeting_id}")
def remove_meeting(
    meeting_id: int,
    db: Session = Depends(get_db)
):
    success = delete_meeting(
        meeting_id,
        db
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return {
        "message": "Meeting deleted successfully"
    }