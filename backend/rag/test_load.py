from vector_store import load_vector_store

db = load_vector_store()

results = db.similarity_search("Who is the CEO?")

print()

for doc in results:
    print(doc.page_content)
    print("-" * 50)