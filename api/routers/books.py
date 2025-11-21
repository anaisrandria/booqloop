from fastapi import APIRouter, HTTPException
from sqlmodel import SQLModel, Session, select
from api.models import Book, BookCreate, BookAvailability, BookAvailabilityCreate, BookCategory, BookCategoryCreate
from api.services import engine

router = APIRouter(prefix='/books', tags=['books'])   

@router.post('/add-category')
def add_category(category: BookCategoryCreate):
    with Session(engine) as session:
        category = BookCategory(name=category.name)
        session.add(category)
        session.commit()
        session.refresh(category)
        return category
    
@router.post('/add-availability')
def add_category(availability: BookAvailabilityCreate):
    with Session(engine) as session:
        availability = BookAvailability(name=availability.name)
        session.add(availability)
        session.commit()
        session.refresh(availability)
        return availability

@router.post("/add-book")
def add_book(book: BookCreate):
    with Session(engine) as session:
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

