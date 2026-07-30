from backend.ai.action_items import extract_action_items


def generate_live_action_items(transcript: str):
    """
    Generate live action items from transcript.
    """

    if not transcript.strip():
        return {
            "action_items": []
        }

    items = extract_action_items(transcript)

    # If AI returns a string, convert it into a list
    if isinstance(items, str):
        items = [
            line.strip("-• ").strip()
            for line in items.splitlines()
            if line.strip()
        ]

    return {
        "action_items": items
    }