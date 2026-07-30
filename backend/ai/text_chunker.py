def split_text(text, chunk_size=500):
    """
    Split long text into small chunks.
    """

    if not text:
        return []

    chunks = []

    start = 0

    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end

    return chunks