import os
from sqlmodel import SQLModel, create_engine, Session, select
from datetime import datetime, timedelta
from jose import jwt
from dotenv import load_dotenv
from api.models import User
import bcrypt
import binascii
from fastapi import Request

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('JWT_ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 60))

# Init database
engine = create_engine(DATABASE_URL)

# Test database
TEST_DATABASE_URL = os.getenv('TEST_DATABASE_URL')
test_engine = create_engine(TEST_DATABASE_URL) if TEST_DATABASE_URL else None

def init_db():
    """Crée toutes les tables définies dans les modèles SQLModel."""
    SQLModel.metadata.create_all(engine)

def get_password_hash(password: str):
    """
    Hache un mot de passe en clair avec bcrypt.

    Args:
        password: Le mot de passe en clair.

    Returns:
        Le mot de passe haché sous forme de bytes.
    """
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    return hash

def verify_password(password: str, hashed_password: str):
    """
    Vérifie qu'un mot de passe en clair correspond au hash stocké en base.

    Args:
        password: Le mot de passe en clair à vérifier.
        hashed_password: Le hash hexadécimal stocké en base.

    Returns:
        True si le mot de passe est correct, False sinon.
    """
    user_bytes = password.encode('utf-8')
    hashed_bytes = binascii.unhexlify(hashed_password[2:])
    result = bcrypt.checkpw(user_bytes, hashed_bytes)
    return result

def create_access_token(data: dict):
    """
    Génère un token JWT signé avec une date d'expiration.

    Args:
        data: Dictionnaire de claims à inclure dans le payload
              (ex: {"sub": "42"}).

    Returns:
        Le token JWT encodé sous forme de chaîne.
    """
    to_encode = data.copy()
    created_at = datetime.utcnow()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"iat": created_at, "exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_user_by_email(session: Session, email: str):
    """
    Recherche un utilisateur par son adresse email.

    Args:
        session: La session SQLModel active.
        email: L'adresse email à rechercher.

    Returns:
        L'utilisateur trouvé, ou None s'il n'existe pas.
    """
    return session.exec(select(User).where(User.email == email)).first()

def get_engine(request: Request):
    if request.headers.get("X-Test-Request") == "true" and test_engine:
        return test_engine
    return engine