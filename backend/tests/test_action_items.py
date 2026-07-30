from backend.ai.action_items import extract_action_items

transcript = """
Today's meeting is about the Adeeb Meeting Agent.

Aryan will develop the backend.

Ali will complete the frontend.

Hassan will deploy the project on Render before Friday.
"""

result = extract_action_items(transcript)

print(result)