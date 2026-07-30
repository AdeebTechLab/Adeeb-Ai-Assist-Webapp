from pathlib import Path

from langchain_community.vectorstores import FAISS

from backend.rag.embedding import LocalEmbeddings


from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

VECTOR_PATH = BASE_DIR / "vectorstore"


def build_vector_store(chunks):
    embeddings = LocalEmbeddings()

    db = FAISS.from_documents(
        chunks,
        embeddings,
    )

    return db


def save_vector_store(db):
    db.save_local(str(VECTOR_PATH))

    print("✅ Vector Store Saved")


def load_vector_store():
    embeddings = LocalEmbeddings()

    db = FAISS.load_local(
        str(VECTOR_PATH),
        embeddings,
        allow_dangerous_deserialization=True,
    )

    print("✅ Vector Store Loaded")

    return db