import os
from dotenv import load_dotenv
from fastapi import Cookie, HTTPException, Response
from jose import jwt, JWTError

load_dotenv()
SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('JWT_ALGORITHM')
COOKIE_MAX_AGE = 60 * 60

def get_current_user(access_token: str = Cookie(default=None)) -> int:
    """
    Vérifie l'authentification via le cookie JWT.

    Lit le cookie `access_token`, vérifie sa signature et retourne
    l'identifiant de l'utilisateur connecté.

    Args:
        access_token: Cookie JWT posé lors de la connexion.

    Returns:
        L'identifiant (int) de l'utilisateur connecté.

    Raises:
        HTTPException 401: Si le cookie est absent.
        HTTPException 403: Si le token est invalide ou expiré.
    """
    if access_token is None:
        raise HTTPException(status_code=401, detail="Non authentifié")
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=403, detail="Token invalide")

        return int(user_id)

    except JWTError:
        raise HTTPException(status_code=403, detail="Token invalide")
    

def set_auth_cookie(response: Response, token: str):
    """
    Pose le cookie JWT sur la réponse HTTP.

    Le cookie est configuré en httpOnly (inaccessible depuis JavaScript)
    et samesite=lax (protection CSRF de base).

    Args:
        response: L'objet Response FastAPI sur lequel poser le cookie.
        token: Le token JWT à stocker dans le cookie.
    """
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,    # inaccessible depuis JavaScript
        secure=True,      # envoyé uniquement en HTTPS (False en dev, True en prod)
        samesite="lax",   # protection CSRF de base
        max_age=COOKIE_MAX_AGE,
    )