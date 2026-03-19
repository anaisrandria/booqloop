import os
from fastapi import APIRouter
from sqlmodel import SQLModel, Session
from api.services import test_engine, get_password_hash
from api.models import User, BookCategory, BookAvailability

router = APIRouter(prefix="/_testing", tags=["testing"])

@router.post("/reset")
def reset_db():
    SQLModel.metadata.drop_all(test_engine)
    SQLModel.metadata.create_all(test_engine)
    return {"ok": True}

@router.post("/seed")
def seed_db():
    with Session(test_engine) as session:

        # Catégories de livres (données statiques nécessaires aux Foreign Key)
        categories = [
            BookCategory(name="Roman"),
            BookCategory(name="Science-fiction"),
            BookCategory(name="Policier"),
        ]
        for c in categories:
            session.add(c)

        # Disponibilités (données statiques nécessaires aux Foreign Key)
        availabilities = [
            BookAvailability(name="Disponible"),
            BookAvailability(name="Indisponible"),
        ]
        for a in availabilities:
            session.add(a)

        session.flush()  # pour obtenir les ids générés avant de créer les users/books

        # Utilisateur propriétaire
        owner = User(
            username="owner_test",
            email="owner@test.com",
            address="1 rue du Test",
            postal_code=75001,
            country="France",
            hashed_password=get_password_hash("password123"),
        )
        session.add(owner)

        # Utilisateur emprunteur
        borrower = User(
            username="borrower_test",
            email="borrower@test.com",
            address="2 rue du Test",
            postal_code=75002,
            country="France",
            hashed_password=get_password_hash("password123"),
        )
        session.add(borrower)

        session.commit()

    return {"ok": True}