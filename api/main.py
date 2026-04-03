from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from sqlmodel import Session, select
from api.services import engine, init_db
from api.models import *
from api.routers import auth, books, conversations, users
import os

# Création de l'instance FastAPI
app = FastAPI(docs_url="/api/py/docs")

# Enregistrement des routers
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(books.router)
app.include_router(conversations.router)

# Router de test — chargé uniquement en environnement de développement
if os.getenv("APP_ENV") == "development":
    from api.routers import testing
    app.include_router(testing.router)

# Configuration du middleware CORS pour autoriser les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost:3001'],
    allow_credentials=True,
    allow_methods=['*'], # TODO: add restrictions
    allow_headers=['*'], # TODO: add restrictions
)

# Au démarrage de l'API, on crée les tables si elles n'existent pas encore
@app.on_event('startup')
def on_startup():
    init_db()