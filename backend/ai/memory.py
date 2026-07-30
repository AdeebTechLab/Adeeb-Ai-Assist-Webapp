from collections import deque

# Store the last 10 conversation messages
conversation_memory = deque(maxlen=10)


def add_message(role: str, content: str):
    """
    Save one message into memory.
    """
    conversation_memory.append({
        "role": role,
        "content": content,
    })


def get_memory():
    """
    Return all stored messages.
    """
    return list(conversation_memory)


def clear_memory():
    """
    Clear the conversation.
    """
    conversation_memory.clear()