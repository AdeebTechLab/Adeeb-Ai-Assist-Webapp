from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.live_summary_service import generate_live_summary

router = APIRouter(
    prefix="/live-summary",
    tags=["Live Summary"]
)


class LiveSummaryRequest(BaseModel):
    transcript: str


@router.post("/")
def live_summary(request: LiveSummaryRequest):
    return generate_live_summary(request.transcript)