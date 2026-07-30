import os

from dotenv import load_dotenv
from groq import Groq

print("Starting Groq Test...")

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

print("API Key Found:", api_key is not None)

if not api_key:
    raise ValueError("GROQ_API_KEY not found")

client = Groq(
    api_key=api_key,
    timeout=60,
)

print("Sending request to Groq...")

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": "Say hello in one sentence."
        }
    ],
)

print("\n========================")
print("SUCCESS")
print("========================")
print(response.choices[0].message.content)