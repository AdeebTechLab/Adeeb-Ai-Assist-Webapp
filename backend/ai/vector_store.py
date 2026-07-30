import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

from backend.ai.vector_persistence import (
    save_vector_store,
    load_vector_store,
)

# Embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

dimension = 384

# Load existing index/documents if available
loaded_index, loaded_documents = load_vector_store()

if loaded_index is None:
    index = faiss.IndexFlatL2(dimension)
    documents = []
else:
    index = loaded_index
    documents = loaded_documents


def add_documents(text_chunks):
    """
    Add text chunks into vector database.
    """

    global documents

    if not text_chunks:
        return

    embeddings = model.encode(text_chunks)

    embeddings = np.array(embeddings).astype("float32")

    index.add(embeddings)

    documents.extend(text_chunks)

    # Save automatically
    save_vector_store(index, documents)


def search_documents(query, top_k=3):
    """
    Return most relevant text chunks.
    """

    if len(documents) == 0:
        return []

    query_embedding = model.encode([query])

    query_embedding = np.array(query_embedding).astype("float32")

    distances, indices = index.search(query_embedding, top_k)

    results = []

    for idx in indices[0]:
        if 0 <= idx < len(documents):
            results.append(documents[idx])

    return results