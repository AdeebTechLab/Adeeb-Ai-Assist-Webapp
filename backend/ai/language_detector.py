import re


def detect_language(text: str) -> str:
    """
    Detect the language of the user's message.
    Returns:
        english
        urdu
        hindi
    """

    text = text.strip()

    # Urdu Unicode range
    if re.search(r"[\u0600-\u06FF]", text):
        return "urdu"

    hindi_keywords = [
        "hai",
        "ka",
        "kya",
        "mera",
        "tum",
        "aap",
        "namaste",
        "dhanyavad",
    ]

    lower = text.lower()

    for word in hindi_keywords:
        if word in lower:
            return "hindi"

    return "english"