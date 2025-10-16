import os
from sqlmodel import SQLModel, create_engine, Session, select
from datetime import datetime, timedelta
from jose import jwt
from dotenv import load_dotenv
from api.models import User
import bcrypt
import binascii

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')
SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('JWT_ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 60))

# Init database
engine = create_engine(DATABASE_URL)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_password_hash(password: str):
    # converting password to array of bytes
    bytes = password.encode('utf-8')

    # generating the salt
    salt = bcrypt.gensalt()

    # Hashing the password
    hash = bcrypt.hashpw(bytes, salt)
    return hash

def verify_password(password: str, hashed_password: str):
    # converting password to array of bytes
    user_bytes = password.encode('utf-8')

    # converting hash from hexadecimal to array of bytes
    hashed_bytes = binascii.unhexlify(hashed_password[2:])
    
    result = bcrypt.checkpw(user_bytes, hashed_bytes)
    return result

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire}) # add expiration date to payload
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_user_by_email(session: Session, email: str):
    return session.exec(select(User).where(User.email == email)).first()