from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from sqlmodel import Session, select
from api.services import engine, init_db
from api.models import *

#We create an instance of FastAPI
app = FastAPI(docs_url="/api/py/docs")

#We define authorizations for middleware components
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

#We use a callback to trigger the creation of the table if they don't exist yet
#When the API is starting
@app.on_event('startup')
def on_startup():
    init_db()

@app.post('/add-user/')
def add_user(user: User):
    with Session(engine) as session:

        exist = session.query(User).filter(
            User.email == user.email).first()
        if exist:
            raise HTTPException(
                status_code=400, detail='Email address already exists')

        session.add(user)
        session.commit()
        session.refresh(user)
        return user
    

@app.get('/get-user/{username}')
def get_user(username: str):
    with Session(engine) as session:
        statement = select(User).where(User.username == username)
        user = session.exec(statement).first()
        if not user: 
            raise HTTPException(status_code=404, detail="User not found") 
        return user
    