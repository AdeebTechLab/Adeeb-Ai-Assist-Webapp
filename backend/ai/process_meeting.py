from backend.ai.speech_to_text import transcribe_audio
from backend.ai.meeting_summary import generate_summary
from backend.ai.action_items import extract_action_items

from backend.ai.text_chunker import split_text
from backend.ai.vector_store import add_documents


def process_meeting(audio_path: str):
    """
    Complete AI Meeting Processing Pipeline
    """

    # Speech → Text
    transcript = transcribe_audio(audio_path)

    # Split transcript into chunks
    chunks = split_text(transcript)

    # Store chunks into FAISS
    add_documents(chunks)

    # Generate summary
    summary = generate_summary(transcript)

    # Extract action items
    action_items = extract_action_items(transcript)

    return {
        "transcript": transcript,
        "summary": summary,
        "action_items": action_items,
    }