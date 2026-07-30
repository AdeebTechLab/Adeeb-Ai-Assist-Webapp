from retriever import retrieve_context

question = "Who is the CEO of Adeeb Technology Lab?"

context = retrieve_context(question)

print()
print("=" * 60)
print("Retrieved Context")
print("=" * 60)
print()

print(context)
