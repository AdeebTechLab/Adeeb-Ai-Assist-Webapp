from backend.ai.groq_client import ask_groq


def extract_action_items(transcript: str) -> str:
    """
    Extract action items, owners and deadlines from a meeting transcript.
    """

    prompt = f"""
You are an AI Meeting Assistant.

Analyze the meeting transcript below.

Extract:

- Action Items
- Responsible Person
- Deadline (if mentioned)

Transcript:

{transcript}

Return the answer in clean bullet points.
"""

    return ask_groq(prompt)