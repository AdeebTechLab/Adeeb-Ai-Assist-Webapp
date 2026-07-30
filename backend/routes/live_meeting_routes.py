from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.services.live_meeting_service import process_live_transcript
from backend.services.live_meeting_db_service import save_live_meeting

router = APIRouter(
    prefix="/live-meeting",
    tags=["Live Meeting"],
)


class LiveMeetingRequest(BaseModel):
    transcript: str


@router.post("/process")
def process_live_meeting(
    request: LiveMeetingRequest,
    db: Session = Depends(get_db),
):
    """
    Process live meeting transcript.
    """

    transcript = request.transcript.strip()

    if not transcript:
        return {
            "success": False,
            "message": "Transcript is empty."
        }

    result = process_live_transcript(transcript)

    meeting = save_live_meeting(
        db=db,
        transcript=transcript,
        summary=result["summary"],
        action_items=result["action_items"],
    )

    return {
        "success": True,
        "meeting_id": meeting.id,
        "transcript": transcript,
        "summary": result["summary"],
        "action_items": result["action_items"],
    }