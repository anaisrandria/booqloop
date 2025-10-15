from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from api.models import User, UserCreate, UserRead
from api.services import engine, get_password_hash, create_access_token, get_user_by_username, verify_password

router = APIRouter(prefix='/auth', tags=['users'])

@router.post('/register', response_model=dict)
def register(user_data: UserCreate):
    with Session(engine) as session:
        user = get_user_by_username(session, user_data.username)
        if user:
            raise HTTPException(status_code=400, detail="Username already registered")
        
        hashed_password = get_password_hash(user_data.password)
        new_user = User(username=user_data.username, email=user_data.email, hashed_password=hashed_password, address=user_data.address, postal_code=user_data.postal_code, country=user_data.country)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        token = create_access_token({"sub": new_user.username})
        return {"access_token": token, "token_type": "bearer"}
    
@router.post('/login', response_model=dict)
def login(user_data: UserCreate):
    with Session(engine) as session:
        user = get_user_by_username(session, user_data.username)
        if not user or not verify_password(user_data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid username and/or password")
        
        token = create_access_token({"sub": user.username})
        return {"access_token": token, "token_type": "bearer"}
    