from loader import load_documents
from splitter import split_documents
from vector_store import build_vector_store
from config import DOCUMENTS_DIR

documents = load_documents(DOCUMENTS_DIR)

chunks = split_documents(documents)

db = build_vector_store(chunks)

print()
print("=" * 50)
print("✅ Vector Database Created Successfully")
print("=" * 50)
print()

results = db.similarity_search("Who is the CEO?")

for i, doc in enumerate(results):

    print(f"Result {i+1}")
    print("-" * 40)
    print(doc.page_content)
    print()