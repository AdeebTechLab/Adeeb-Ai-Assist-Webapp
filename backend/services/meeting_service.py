from sqlalchemy.orm import Session

from backend.models.meeting import Meeting
from backend.schemas.meeting import (
    MeetingResponse,
)


def save_meeting(
    db: Session,
    filename: str,
    transcript: str,
    summary: str,
    action_items: str,
):
    meeting = Meeting(
        filename=filename,
        transcript=transcript,
        summary=summary,
        action_items=action_items,
    )

    db.add(meeting)
    db.commit()
    db.refresh(meeting)

    return meeting


def get_all_meetings(db: Session):
    return (
        db.query(Meeting)
        .order_by(Meeting.created_at.desc())
        .all()
    )


def get_meeting(
    meeting_id: int,
    db: Session,
):
    return (
        db.query(Meeting)
        .filter(Meeting.id == meeting_id)
        .first()
    )


def delete_meeting(
    meeting_id: int,
    db: Session,
):
    meeting = get_meeting(meeting_id, db)

    if meeting is None:
        return False

    db.delete(meeting)
    db.commit()

    return True