from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from api.models import User
from api.security import get_current_user
from api.services import engine

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/{user_id}')
def get_user_by_id(user_id: int, current_user_id: str = Depends(get_current_user)):
    with Session(engine) as session:
        user = session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"id": user.id, "username": user.username}
    