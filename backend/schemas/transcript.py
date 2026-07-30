from pydantic import BaseModel


class TranscriptCreate(BaseModel):
    meeting_id: int
    transcript: str


class TranscriptResponse(BaseModel):
    id: int
    meeting_id: int
    transcript: str

    model_config = {
        "from_attributes": True
    }