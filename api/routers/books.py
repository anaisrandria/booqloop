from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from api.models import Book, BookCreate, BookCategory, BookDetailRead, BookRead, User
from api.security import get_current_user
from api.services import engine

router = APIRouter(prefix='/books', tags=['books'])   

@router.post('/')
def add_book(book: BookCreate, user_id: int = Depends(get_current_user)):
    with Session(engine) as session:
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
    category_id: int | None = Query(default=None, description="Filter by category ID"),
    postal_code: int | None = Query(default=None, description="Filter by user postal code")
):
    with Session(engine) as session:
        statement = select(Book).options(selectinload(Book.user))

        # Appliquer les filtres dynamiques
        if category_id is not None:
            statement = statement.where(Book.category_id == category_id)
        if postal_code is not None:
            statement = statement.where(Book.user.has(User.postal_code == postal_code))

        books = session.exec(statement).all()
        return books
    
@router.get("/{book_id}", response_model=BookDetailRead)
def get_book(book_id: int):
    with Session(engine) as session:
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
def get_categories():
    with Session(engine) as session:
        statement = select(BookCategory)
        categories = session.exec(statement).all()
        return categories