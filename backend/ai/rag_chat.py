from backend.ai.groq_client import client
from backend.ai.memory import (
    add_message,
    get_memory,
)
from backend.ai.vector_store import search_documents


SYSTEM_PROMPT = """
You are Adeeb Meeting Agent.

Rules:

1. Detect the user's language.
2. Reply ONLY in the same language.
3. Never change the language unless the user asks.
4. First use the meeting context if it is relevant.
5. If the answer is not found in the meeting context,
   clearly mention that and then answer from general knowledge.
6. Remember previous conversation.
"""


def chat_with_adeeb(message: str) -> str:
    """
    Chat with Adeeb using Memory + RAG.
    """

    # Search relevant meeting chunks
    retrieved_chunks = search_documents(message)

    meeting_context = "\n\n".join(retrieved_chunks)

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        }
    ]

    # Add retrieved meeting context
    if meeting_context:
        messages.append(
            {
                "role": "system",
                "content": f"Meeting Context:\n{meeting_context}",
            }
        )

    # Add conversation memory
    messages.extend(get_memory())

    # Current user message
    messages.append(
        {
            "role": "user",
            "content": message,
        }
    )

    chat = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.3,
    )

    answer = chat.choices[0].message.content

    # Save conversation memory
    add_message("user", message)
    add_message("assistant", answer)

    return answer