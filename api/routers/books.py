from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from api.models import Book, BookCreate, BookCategory, BookDetailRead, BookRead, User
from api.security import get_current_user
from api.services import get_engine
from datetime import datetime

router = APIRouter(prefix='/books', tags=['books'])   

@router.post('/')
def add_book(book: BookCreate, request: Request, user_id: int = Depends(get_current_user)):
    """
    Ajoute un nouveau livre pour l'utilisateur connecté.

    Args:
        book: Les données du livre à créer.
        user_id: L'identifiant de l'utilisateur connecté (extrait du cookie).

    Returns:
        Le livre créé.
    """
    with Session(get_engine(request)) as session:
        new_book = Book(
            title=book.title,
            author=book.author,
            description=book.description,
            published_year=book.published_year,
            image_url=book.image_url,
            user_id=user_id,
            category_id=book.category_id,
            availability_status_id=book.availability_status_id
        )
        session.add(new_book)
        session.commit()
        session.refresh(new_book)
        return new_book
    
@router.get('/', response_model=list[BookRead])
def get_books(
    request: Request,
    category_id: int | None = Query(default=None),
    postal_code: int | None = Query(default=None)
):
    """
    Retourne la liste des livres, avec filtres optionnels.

    Args:
        category_id: Filtre optionnel par identifiant de catégorie.
        postal_code: Filtre optionnel par code postal de l'utilisateur propriétaire.

    Returns:
        La liste des livres correspondant aux filtres.
    """
    with Session(get_engine(request)) as session:
        statement = select(Book).options(selectinload(Book.user))
        if category_id is not None:
            statement = statement.where(Book.category_id == category_id)
        if postal_code is not None:
            statement = statement.where(Book.user.has(User.postal_code == postal_code))
        return session.exec(statement).all()

@router.get('/user/me', response_model=list[BookRead])
def get_user_books(request: Request, user_id: int = Depends(get_current_user)):
    """
    Retourne tous les livres de l'utilisateur connecté.

    Args:
        user_id: L'identifiant de l'utilisateur connecté (extrait du cookie).

    Returns:
        La liste des livres appartenant à l'utilisateur connecté.
    """
    with Session(get_engine(request)) as session:
        statement = (
            select(Book)
            .where(Book.user_id == user_id)
            .options(selectinload(Book.user))
        )
        return session.exec(statement).all()

@router.get("/{book_id}", response_model=BookDetailRead)
def get_book(book_id: int, request: Request):
    """
    Retourne le détail d'un livre par son identifiant.

    Args:
        book_id: L'identifiant du livre.

    Raises:
        HTTPException 404: Si le livre n'existe pas.

    Returns:
        Le livre avec ses détails et les informations de son propriétaire.
    """
    with Session(get_engine(request)) as session:
        statement = (
            select(Book)
            .where(Book.id == book_id)
            .options(selectinload(Book.user))
        )
        book = session.exec(statement).first()
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book

@router.get('/categories/all')
def get_categories(request: Request):
    """
    Retourne la liste de toutes les catégories de livres.

    Returns:
        La liste des catégories disponibles.
    """
    with Session(get_engine(request)) as session:
        return session.exec(select(BookCategory)).all()

@router.put('/{book_id}')
def update_book(book_id: int, book: BookCreate, request: Request, user_id: int = Depends(get_current_user)):
    """
    Met à jour un livre existant.

    Args:
        book_id: L'identifiant du livre à modifier.
        book: Les nouvelles données du livre.
        user_id: L'identifiant de l'utilisateur connecté (extrait du cookie).

    Raises:
        HTTPException 404: Si le livre n'existe pas.
        HTTPException 403: Si l'utilisateur n'est pas le propriétaire du livre.

    Returns:
        Le livre mis à jour.
    """
    with Session(get_engine(request)) as session:
        existing_book = session.get(Book, book_id)
        if not existing_book:
            raise HTTPException(status_code=404, detail="Book not found")
        if existing_book.user_id != user_id:
            raise HTTPException(status_code=403, detail="Not allowed")

        existing_book.title = book.title
        existing_book.author = book.author
        existing_book.description = book.description
        existing_book.published_year = book.published_year
        existing_book.image_url = book.image_url
        existing_book.category_id = book.category_id
        existing_book.updated_at = datetime.utcnow()

        session.add(existing_book)
        session.commit()
        session.refresh(existing_book)
        return existing_book