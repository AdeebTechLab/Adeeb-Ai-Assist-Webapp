from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from backend.database.database import Base


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    transcript = Column(Text, nullable=False)

    summary = Column(Text, nullable=False)

    action_items = Column(Text, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)