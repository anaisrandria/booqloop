from fastapi import APIRouter, HTTPException, Response, Request
from sqlmodel import Session
from api.models import User, UserCreate, UserLogin
from api.security import set_auth_cookie
from api.services import get_password_hash, create_access_token, get_user_by_email, verify_password, get_engine

router = APIRouter(prefix='/auth', tags=['users'])

@router.post('/register', response_model=dict)
def register(user_data: UserCreate, request: Request, response: Response):
    """
    Crée un nouveau compte utilisateur et ouvre une session.

    Vérifie que l'email n'est pas déjà utilisé, hache le mot de passe,
    crée l'utilisateur en base, puis pose un cookie JWT.

    Args:
        user_data: Les données d'inscription (username, email, password, etc.).
        response: L'objet Response FastAPI pour poser le cookie.

    Raises:
        HTTPException 400: Si l'email est déjà associé à un compte.

    Returns:
        Un message de confirmation.
    """
    with Session(get_engine(request)) as session:
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
def login(user_data: UserLogin, request: Request, response: Response):
    """
    Authentifie un utilisateur et ouvre une session.

    Vérifie l'email et le mot de passe, puis pose un cookie JWT
    en cas de succès.

    Args:
        user_data: Les identifiants de connexion (email, password).
        response: L'objet Response FastAPI pour poser le cookie.

    Raises:
        HTTPException 401: Si l'email ou le mot de passe est incorrect.

    Returns:
        Un message de confirmation.
    """
    with Session(get_engine(request)) as session:
        user = get_user_by_email(session, user_data.email)
        if not user or not verify_password(user_data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email and/or password")

        token = create_access_token({"sub": str(user.id)})
        set_auth_cookie(response, token)
        return {"message": "Connexion réussie"}
    
@router.post('/logout')
def logout(response: Response):
    """
    Déconnecte l'utilisateur en supprimant le cookie JWT.

    Args:
        response: L'objet Response FastAPI pour supprimer le cookie.

    Returns:
        Un message de confirmation.
    """
    response.delete_cookie("access_token")
    return {"message": "Utilisateur déconnecté"}