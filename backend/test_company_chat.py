from backend.services.company_chat_service import ask_company

question = "Who is the CEO of Adeeb Technology Lab?"

result = ask_company(question)

print()
print("=" * 60)
print("QUESTION")
print("=" * 60)
print(result["question"])

print()
print("=" * 60)
print("ANSWER")
print("=" * 60)
print(result["answer"]) 