#  Adeeb AI Meeting Assistant

An AI-powered Meeting Assistant developed by Adeeb Technology Lab.

This application helps users record meetings, upload meeting audio, generate AI summaries, extract action items, and chat with company knowledge using Retrieval-Augmented Generation (RAG).

---

# Features

- Live Meeting Recording
- Upload Meeting Audio
- Automatic Meeting Summary
- Action Item Extraction
- AI Chat Assistant
- Company Knowledge Chat (RAG)
- FAISS Vector Database
- Groq LLM Integration
- Speech-to-Text
- Text-to-Speech
- AI Avatar Support

---

# Tech Stack

## Backend

- Python
- FastAPI
- SQLAlchemy
- LangChain
- FAISS
- Sentence Transformers
- Groq API

## Frontend

- React
- Vite
- Axios
- Tailwind CSS

---

# Project Structure

```
backend/
frontend/
electron/
requirements.txt
README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/AdeebTechLab/Adeeb-Ai-Assist-Webapp.git
```

## Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Run Backend

```bash
uvicorn backend.main:app --reload
```

---

# API Documentation

```
http://127.0.0.1:8000/docs
```

---

# Company Knowledge Base

The AI Assistant uses:

- Local Sentence Transformer Embeddings
- FAISS Vector Store
- Retrieval-Augmented Generation (RAG)
- Groq Llama 3.3 70B

to answer company-related questions.

---

# Developed By

Aryan Khan Niazi

BS Artificial Intelligence

Adeeb Technology Lab Internship

---

# License

This project is developed for educational and internship purposes under Adeeb Technology Lab.