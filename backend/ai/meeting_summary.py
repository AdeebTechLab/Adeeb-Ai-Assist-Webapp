from backend.ai.groq_client import ask_groq


def generate_summary(transcript: str) -> str:
    """
    Generate a professional meeting summary from transcript.
    """

    prompt = f"""
You are an AI Meeting Assistant.

Summarize the following meeting professionally.

Transcript:
{transcript}

Return:
- Meeting Overview
- Key Discussion Points
- Decisions Made
"""

    return ask_groq(prompt)