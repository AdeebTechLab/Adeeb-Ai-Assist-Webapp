from langchain_community.vectorstores import FAISS

from backend.rag.embedding import LocalEmbeddings
from backend.rag.config import VECTOR_DB_DIR


def build_vector_store(chunks):
    embeddings = LocalEmbeddings()

    db = FAISS.from_documents(
        chunks,
        embeddings,
    )

    return db


def save_vector_store(db):
    db.save_local(str(VECTOR_DB_DIR))
    print("✅ Vector Store Saved")


def load_vector_store():
    embeddings = LocalEmbeddings()

    db = FAISS.load_local(
        str(VECTOR_DB_DIR),
        embeddings,
        allow_dangerous_deserialization=True,
    )

    print("✅ Vector Store Loaded")

    return db