from sqlalchemy.orm import Session

from backend.models.meeting import Meeting


def create_meeting(
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
    return db.query(Meeting).order_by(Meeting.id.desc()).all()


def get_meeting(db: Session, meeting_id: int):
    return db.query(Meeting).filter(Meeting.id == meeting_id).first()