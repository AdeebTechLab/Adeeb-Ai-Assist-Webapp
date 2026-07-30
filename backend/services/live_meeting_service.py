from backend.ai.meeting_summary import generate_summary
from backend.ai.action_items import extract_action_items
from backend.ai.text_chunker import split_text
from backend.ai.vector_store import add_documents


def process_live_transcript(transcript: str):
    """
    Process a live meeting transcript.
    """

    # Split transcript into chunks
    chunks = split_text(transcript)

    # Store chunks in vector database
    add_documents(chunks)

    # Generate AI summary
    summary = generate_summary(transcript)

    # Extract action items
    action_items = extract_action_items(transcript)

    return {
        "success": True,
        "summary": summary,
        "action_items": action_items,
    }