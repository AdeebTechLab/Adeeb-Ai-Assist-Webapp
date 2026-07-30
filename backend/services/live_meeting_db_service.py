from sqlalchemy.orm import Session

from backend.models.meeting import Meeting


def save_live_meeting(
    db: Session,
    transcript: str,
    summary: str,
    action_items,
):
    """
    Save a live meeting into the database.
    """

    meeting = Meeting(
        filename="Live Meeting",
        transcript=transcript,
        summary=summary,
        action_items="\n".join(action_items)
        if isinstance(action_items, list)
        else str(action_items),
    )

    db.add(meeting)
    db.commit()
    db.refresh(meeting)

    return meeting