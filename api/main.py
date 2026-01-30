from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from sqlmodel import Session, select
from api.services import engine, init_db
from api.models import *
from api.routers import users, auth, books, messages

#We create an instance of FastAPI
app = FastAPI(docs_url="/api/py/docs")

# app.include_router(users.router)
app.include_router(auth.router)
app.include_router(books.router)
app.include_router(messages.router)


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