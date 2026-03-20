from fastapi import APIRouter, HTTPException, Response
from sqlmodel import Session
from api.models import User, UserCreate, UserLogin
from api.services import engine, get_password_hash, create_access_token, get_user_by_email, verify_password

router = APIRouter(prefix='/auth', tags=['users'])

COOKIE_MAX_AGE = 60 * 60

def set_auth_cookie(response: Response, token: str):
    """Pose le cookie JWT sur la réponse."""
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,    # inaccessible depuis JavaScript
        secure=True,      # envoyé uniquement en HTTPS (False en dev, True en prod)
        samesite="lax",   # protection CSRF de base
        max_age=COOKIE_MAX_AGE,
    )

@router.post('/register', response_model=dict)
def register(user_data: UserCreate, response: Response):
    with Session(engine) as session:
        user = get_user_by_email(session, user_data.email)
        if user:
            raise HTTPException(status_code=400, detail="User already exists")

        hashed_password = get_password_hash(user_data.password)
        new_user = User(username=user_data.username, email=user_data.email, hashed_password=hashed_password, address=user_data.address, postal_code=user_data.postal_code, country=user_data.country)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        token = create_access_token({"sub": str(new_user.id)})
        set_auth_cookie(response, token)
        return {"message": "Inscription réussie"}

@router.post('/login', response_model=dict)
def login(user_data: UserLogin, response: Response):
    with Session(engine) as session:
        user = get_user_by_email(session, user_data.email)
        if not user or not verify_password(user_data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email and/or password")

        token = create_access_token({"sub": str(user.id)})
        set_auth_cookie(response, token)
        return {"message": "Connexion réussie"}
    
@router.post('/logout')
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Utilisateur déconnecté"}