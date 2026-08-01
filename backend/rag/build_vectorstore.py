from backend.rag.loader import load_documents
from backend.rag.splitter import split_documents
from backend.rag.vector_store import (
    build_vector_store,
    save_vector_store,
)
from backend.rag.config import DOCUMENTS_DIR


documents = load_documents(DOCUMENTS_DIR)

chunks = split_documents(documents)

db = build_vector_store(chunks)

save_vector_store(db)

print("\n🎉 RAG Index Ready")