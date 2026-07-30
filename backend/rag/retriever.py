from backend.rag.vector_store import load_vector_store

# Load FAISS only once
db = load_vector_store()


def retrieve_context(question, k=3):
    """
    Retrieve the most relevant chunks for a user question.
    """
    docs = db.similarity_search(question, k=k)

    context = "\n\n".join(
        doc.page_content
        for doc in docs
    )

    return context