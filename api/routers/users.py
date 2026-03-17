from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from api.models import User
from api.services import engine

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/{user_id}')
def get_user_by_id(user_id: int):
    with Session(engine) as session:
        user = session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"id": user.id, "username": user.username}

# @router.post('/add-user')
# def add_user(user: User):
#     with Session(engine) as session:

#         exist = session.query(User).filter(
#             User.email == user.email).first()
#         if exist:
#             raise HTTPException(
#                 status_code=400, detail='Email address already exists')

#         session.add(user)
#         session.commit()
#         session.refresh(user)
#         return user
    

# @router.get('/get-user/{username}')
# def get_user(username: str):
#     with Session(engine) as session:
#         statement = select(User).where(User.username == username)
#         user = session.exec(statement).first()
#         if not user: 
#             raise HTTPException(status_code=404, detail="User not found") 
#         return user
    