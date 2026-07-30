from backend.ai.meeting_summary import generate_summary

transcript = """
Hello everyone.

Today's meeting is about the Adeeb Meeting Agent.

Aryan will develop the backend.

Ali will develop the frontend.

The project deadline is next Friday.
"""

summary = generate_summary(transcript)

print(summary)