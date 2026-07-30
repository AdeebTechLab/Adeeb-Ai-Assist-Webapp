import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
    timeout=60,   # 60 seconds
)


def ask_groq(context, question):
    """
    Generate answer using company RAG context.
    """

    prompt = f"""
You are the official AI assistant of Adeeb Technology Lab.

You MUST answer ONLY from the company context below.

If the answer is not present in the context, reply exactly:

I don't have that information in the company knowledge base.

======================
COMPANY KNOWLEDGE
======================

{context}

======================
QUESTION
======================

{question}

======================
ANSWER
======================
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        max_tokens=512,
        messages=[
            {
                "role": "system",
                "content": "You answer only from the provided company knowledge.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )

    return response.choices[0].message.content.strip()