from backend.ai.meeting_summary import generate_summary


def generate_live_summary(transcript: str):
    """
    Generate live meeting summary.
    """

    if not transcript.strip():
        return {
            "summary": ""
        }

    summary = generate_summary(transcript)

    return {
        "summary": summary
    }