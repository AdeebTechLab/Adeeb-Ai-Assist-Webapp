from fastapi import FastAPI

from backend.database.database import engine
from backend.database.base import Base

from backend.routes.auth_routes import router as auth_router
from backend.routes.user_routes import router as user_router
from backend.routes.meeting_routes import router as meeting_router
from backend.routes.upload_routes import router as upload_router
from backend.routes.conversation_routes import router as conversation_router
from backend.routes.live_meeting_routes import router as live_meeting_router
from backend.routes.live_summary_routes import router as live_summary_router
from backend.routes.live_action_routes import router as live_action_router
from backend.routes.audio_upload_routes import router as audio_upload_router
from backend.routes.company_chat_routes import router as company_chat_router


from fastapi.middleware.cors import CORSMiddleware

# ==========================================
# Create Database Tables
# ==========================================
Base.metadata.create_all(bind=engine)


# ==========================================
# FastAPI App
# ==========================================
app = FastAPI(
    title="Adeeb Meeting Agent API",
    description="AI Powered Meeting Assistant",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Home Route
# ==========================================
@app.get("/")
def home():
    return {
        "message": "Welcome to Adeeb Meeting Agent API",
        "status": "Running"
    }


# ==========================================
# Register Routes
# ==========================================
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(meeting_router)
app.include_router(upload_router)
app.include_router(conversation_router)
app.include_router(live_meeting_router)
app.include_router(live_summary_router)
app.include_router(live_action_router)
app.include_router(audio_upload_router)
app.include_router(company_chat_router)