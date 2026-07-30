from pydantic import BaseModel


class SummaryCreate(BaseModel):
    meeting_id: int
    summary: str


class SummaryResponse(BaseModel):
    id: int
    meeting_id: int
    summary: str

    model_config = {
        "from_attributes": True
    }