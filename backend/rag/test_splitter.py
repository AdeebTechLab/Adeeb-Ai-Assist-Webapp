from loader import load_documents
from splitter import split_documents
from config import DOCUMENTS_DIR


documents = load_documents(DOCUMENTS_DIR)

chunks = split_documents(documents)

print()
print("=" * 60)
print("Total Chunks:", len(chunks))
print("=" * 60)

for i, chunk in enumerate(chunks):

    print()

    print(f"Chunk {i+1}")

    print("-" * 40)

    print(chunk.page_content)