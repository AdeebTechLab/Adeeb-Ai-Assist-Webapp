from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database.database import get_db

from backend.schemas.user import (
    UserCreate,
    UserUpdate,
    UserResponse
)

from backend.services.user_service import (
    create_user,
    get_all_users,
    get_user,
    update_user,
    delete_user
)

from backend.auth.permissions import admin_required

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/", response_model=UserResponse)
def create(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return create_user(user, db)


@router.get("/", response_model=list[UserResponse])
def get_all(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return get_all_users(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_one(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    user = get_user(user_id, db)

    if not user:
        raise HTTPException(404, "User not found")

    return user


@router.put("/{user_id}", response_model=UserResponse)
def update(
    user_id: int,
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    user = update_user(user_id, data, db)

    if not user:
        raise HTTPException(404, "User not found")

    return user


@router.delete("/{user_id}")
def delete(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):

    success = delete_user(user_id, db)

    if not success:
        raise HTTPException(404, "User not found")

    return {
        "success": True,
        "message": "User deleted successfully"
    }