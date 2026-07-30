from backend.rag.retriever import retrieve_context
from backend.ai.groq_client import ask_groq


def ask_company(question):
    """
    RAG Pipeline:
    Question
        ↓
    Retriever
        ↓
    Context
        ↓
    Groq
        ↓
    Final Answer
    """

    context = retrieve_context(question)

    answer = ask_groq(
        context=context,
        question=question,
    )

    return {
        "question": question,
        "answer": answer,
        "context": context,
    }