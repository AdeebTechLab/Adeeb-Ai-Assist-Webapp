from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.conversation_service import get_ai_response

router = APIRouter(
    prefix="/chat",
    tags=["Conversation"],
)


class ChatRequest(BaseModel):
    message: str


@router.post("/")
def chat(request: ChatRequest):
    return get_ai_response(request.message)