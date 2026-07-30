import os
import faiss
import pickle

INDEX_PATH = "backend/storage/faiss.index"
DOCS_PATH = "backend/storage/documents.pkl"


def save_vector_store(index, documents):
    """
    Save FAISS index and documents to disk.
    """

    os.makedirs("backend/storage", exist_ok=True)

    faiss.write_index(index, INDEX_PATH)

    with open(DOCS_PATH, "wb") as f:
        pickle.dump(documents, f)


def load_vector_store():
    """
    Load FAISS index and documents from disk.
    """

    if not os.path.exists(INDEX_PATH):
        return None, []

    index = faiss.read_index(INDEX_PATH)

    with open(DOCS_PATH, "rb") as f:
        documents = pickle.load(f)

    return index, documents