from loader import load_documents
from splitter import split_documents
from vector_store import (
    build_vector_store,
    save_vector_store,
)

from config import DOCUMENTS_DIR


documents = load_documents(DOCUMENTS_DIR)

chunks = split_documents(documents)

db = build_vector_store(chunks)

save_vector_store(db)

print()

print("🎉 RAG Index Ready")