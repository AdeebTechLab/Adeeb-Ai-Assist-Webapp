from loader import load_documents
from config import DOCUMENTS_DIR

docs = load_documents(DOCUMENTS_DIR)

print()

print("Documents Loaded:", len(docs))

print()

for doc in docs:

    print("=" * 50)

    print(doc.page_content)