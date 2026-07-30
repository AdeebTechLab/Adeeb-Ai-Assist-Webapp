from sqlalchemy.orm import Session

from backend.models.user import User
from backend.schemas.auth import LoginRequest
from backend.auth.security import (
    verify_password,
    create_access_token
)


def login_user(data: LoginRequest, db: Session):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        return None

    if not verify_password(
        data.password,
        user.password
    ):
        return None

    token = create_access_token(
        {
            "user_id": user.id,
            "email": user.email,
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }