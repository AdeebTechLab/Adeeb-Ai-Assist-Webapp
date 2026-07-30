from pydantic import BaseModel


class ActionItemCreate(BaseModel):
    meeting_id: int
    action: str


class ActionItemResponse(BaseModel):
    id: int
    meeting_id: int
    action: str

    model_config = {
        "from_attributes": True
    }