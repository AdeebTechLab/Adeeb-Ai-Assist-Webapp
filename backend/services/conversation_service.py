from backend.ai.rag_chat import chat_with_adeeb


def get_ai_response(message: str):
    """
    Generate AI response using RAG + Memory.
    """

    response = chat_with_adeeb(message)

    return {
        "user_message": message,
        "assistant_response": response,
    }