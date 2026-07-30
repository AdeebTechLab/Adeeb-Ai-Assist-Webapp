from sqlalchemy.orm import Session

from backend.models.meeting import Meeting


def build_meeting_context(db: Session) -> str:
    """
    Build context from the latest meetings.
    """

    meetings = (
        db.query(Meeting)
        .order_by(Meeting.created_at.desc())
        .limit(5)
        .all()
    )

    if not meetings:
        return "No meetings are available."

    context = ""

    for meeting in meetings:
        context += f"""
Meeting File:
{meeting.filename}

Summary:
{meeting.summary}

Action Items:
{meeting.action_items}

-------------------------------------
"""

    return context