from fastapi import APIRouter, HTTPException, Query, Request
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from api.models import Book, BookCreate, BookCategory, BookDetailRead, BookRead, User
from api.services import get_engine

router = APIRouter(tags=['books'])

@router.post('/books')
def add_book(book: BookCreate, request: Request):
    with Session(get_engine(request)) as session:
        new_book = Book(
            title=book.title,
            author=book.author,
            description=book.description,
            published_year=book.published_year,
            image_url=book.image_url,
            user_id=book.user_id,
            category_id=book.category_id,
            availability_status_id=book.availability_status_id
        )
        session.add(new_book)
        session.commit()
        session.refresh(new_book)
        return new_book

@router.get("/books", response_model=list[BookRead])
def get_books(
    request: Request,
    category_id: int | None = Query(default=None),
    postal_code: int | None = Query(default=None)
):
    with Session(get_engine(request)) as session:
        statement = select(Book).options(selectinload(Book.user))
        if category_id is not None:
            statement = statement.where(Book.category_id == category_id)
        if postal_code is not None:
            statement = statement.where(Book.user.has(User.postal_code == postal_code))
        return session.exec(statement).all()

@router.get("/books/{book_id}", response_model=BookDetailRead)
def get_book(book_id: int, request: Request):
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

@router.get('/categories')
def get_categories(request: Request):
    with Session(get_engine(request)) as session:
        return session.exec(select(BookCategory)).all()