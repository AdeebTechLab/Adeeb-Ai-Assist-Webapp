from sqlalchemy.orm import Session

from backend.models.user import User
from backend.schemas.user import UserCreate, UserUpdate
from backend.auth.security import hash_password


def create_user(user: UserCreate, db: Session):

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_all_users(db: Session):
    return db.query(User).all()


def get_user(user_id: int, db: Session):
    return db.query(User).filter(
        User.id == user_id
    ).first()


def update_user(
    user_id: int,
    data: UserUpdate,
    db: Session
):

    user = get_user(user_id, db)

    if not user:
        return None

    if data.full_name is not None:
        user.full_name = data.full_name

    if data.email is not None:
        user.email = data.email

    if data.role is not None:
        user.role = data.role

    if data.is_active is not None:
        user.is_active = data.is_active

    if data.password:
        user.password = hash_password(
            data.password
        )

    db.commit()
    db.refresh(user)

    return user


def delete_user(
    user_id: int,
    db: Session
):

    user = get_user(user_id, db)

    if not user:
        return False

    db.delete(user)
    db.commit()

    return True