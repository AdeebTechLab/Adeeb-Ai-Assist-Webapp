from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.live_action_service import generate_live_action_items

router = APIRouter(
    prefix="/live-action",
    tags=["Live Action Items"],
)


class LiveActionRequest(BaseModel):
    transcript: str


@router.post("/")
def live_action(request: LiveActionRequest):
    """
    Generate live action items during the meeting.
    """
    return generate_live_action_items(request.transcript)