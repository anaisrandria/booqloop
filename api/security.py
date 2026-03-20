import os
from dotenv import load_dotenv
from fastapi import Cookie, HTTPException
from jose import jwt, JWTError

load_dotenv()
SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('JWT_ALGORITHM')

def get_current_user(access_token: str = Cookie(default=None)) -> int:
    """Dépendance FastAPI : lit le cookie et vérifie la signature du JWT."""
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