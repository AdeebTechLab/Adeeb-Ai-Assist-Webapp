from datetime import datetime
from pydantic import BaseModel


class MeetingResponse(BaseModel):
    id: int
    filename: str
    transcript: str
    summary: str
    action_items: str
    created_at: datetime

    class Config:
        from_attributes = True