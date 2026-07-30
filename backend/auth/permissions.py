from fastapi import Depends, HTTPException, status

from backend.auth.auth import get_current_user


def admin_required(current_user=Depends(get_current_user)):
    """
    Allow only Admin users.
    """
    if current_user.role.lower() != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required."
        )

    return current_user


def employee_required(current_user=Depends(get_current_user)):
    """
    Allow Employee and Admin users.
    """
    if current_user.role.lower() not in ["employee", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee access required."
        )

    return current_user