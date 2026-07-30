from backend.ai.process_meeting import process_meeting

from backend.ai.text_chunker import split_text
from backend.ai.vector_store import add_documents


def process_audio(audio_path: str):
    """
    Process uploaded meeting.
    """

    result = process_meeting(audio_path)

    # Transcript ko chunks me split karo
    chunks = split_text(result["transcript"])

    # Vector database me save karo
    add_documents(chunks)

    return result