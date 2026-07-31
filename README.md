#  Adeeb AI Meeting Assistant

An AI-powered Meeting Assistant developed by Adeeb Technology Lab.

This application helps users record meetings, upload meeting audio, generate AI summaries, extract action items, and chat with company knowledge using Retrieval-Augmented Generation (RAG).



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



# Tech Stack

# Backend

- Python
- FastAPI
- SQLAlchemy
- LangChain
- FAISS
- Sentence Transformers
- Groq API

# Frontend

- React
- Vite
- Axios
- Tailwind CSS


# Project Structure

```
Adeeb-Ai-Assist-Webapp
│
├── backend/
├── frontend/
├── electron/
├── requirements.txt
├── README.md
```

---

# Installation

# 1. Clone Repository

```bash
git clone https://github.com/AdeebTechLab/Adeeb-Ai-Assist-Webapp.git

cd Adeeb-Ai-Assist-Webapp
```

---

# 2. Create Virtual Environment

```bash
python -m venv .venv
```

---

# 3. Activate Virtual Environment

# Windows

```bash
.venv\Scripts\activate
```

# Linux / Mac

```bash
source .venv/bin/activate
```

---

# 4. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

# 5. Install Frontend Dependencies

```bash
cd frontend

npm install
```



# Environment Variables

Create a `.env` file in the project root.

Example:

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

# Build Company Knowledge Base (First Time Only)

Before using Company Chat, build the vector database.

```bash
python -m backend.rag.build_vectorstore
```

If successful, a FAISS vector store will be created inside:

```
backend/storage/
```



# Running the Project

# Step 1 — Start Backend

Open Terminal 1

```bash
uvicorn backend.main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

#  Step 2 — Start Frontend

Open Terminal 2

```bash
cd frontend

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Open the above URL in your browser.



# How to Use the Project

# Dashboard

View project overview and navigate to all modules.



# Upload Meeting

- Upload meeting audio.
- AI generates:
  - Transcript
  - Summary
  - Action Items



# Meetings

View all saved meetings.

Click any meeting to view:

- Transcript
- Summary
- Action Items



# Live Meeting

Record a meeting in real time.

The system processes the meeting and stores the results automatically.



# AI Chat

Ask questions about previous meetings.

Example:

```
Summarize today's meeting.
```



# Company Chat (RAG)

Ask company-related questions.

Example:

```
Who is the CEO?

Where is the head office?

What services does the company provide?
```

The assistant answers only from the company knowledge base.



# API Documentation

After running the backend:

```
http://127.0.0.1:8000/docs
```



# Company Knowledge Base

The Company Chat module uses:

- Sentence Transformers
- FAISS Vector Store
- LangChain Retriever
- Retrieval-Augmented Generation (RAG)
- Groq Llama 3.3 70B



# Future Improvements

- Authentication System
- Multi-user Support
- Live Meeting Translation
- Better Voice Assistant
- Cloud Deployment
- PDF Meeting Reports



# Developed By

* Muhammad Aryan Khan Niazi*

BS Artificial Intelligence

AI/ML Intern

Adeeb Technology Lab



# License

This project is developed for educational and internship purposes under Adeeb Technology Lab.