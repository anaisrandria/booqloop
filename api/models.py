from datetime import date, datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship


# -----------------------------
# USERS
# -----------------------------
class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int = Field(primary_key=True)
    username: str = Field(max_length=255, unique=True, nullable=False)
    email: str = Field(max_length=255, unique=True, nullable=False)
    password: str = Field(max_length=255, nullable=False)
    address: str = Field(max_length=255, nullable=False)
    postal_code: int
    country: str = Field(max_length=255, nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    # Relations
    books: List["Book"] = Relationship(back_populates="user")
    requests: List["Request"] = Relationship(back_populates="user")
    reviews: List["Review"] = Relationship(back_populates="user")
    messages: List["Message"] = Relationship(back_populates="author")


# -----------------------------
# BOOKS
# -----------------------------
class Book(SQLModel, table=True):
    __tablename__ = "books"

    id: int = Field(primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    title: str = Field(max_length=255)
    author: str = Field(max_length=255)
    description: str
    published_year: Optional[int] = None
    category_id: int = Field(foreign_key="book_categories.id")
    image_url: str = Field(max_length=255)
    availability_status_id: int = Field(foreign_key="book_availabilities.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    # Relations
    user: User = Relationship(back_populates="books")
    category: "BookCategory" = Relationship(back_populates="books")
    availability: "BookAvailability" = Relationship(back_populates="books")
    requests: List["Request"] = Relationship(back_populates="book")
    reviews: List["Review"] = Relationship(back_populates="book")


# -----------------------------
# REQUESTS
# -----------------------------
class Request(SQLModel, table=True):
    __tablename__ = "requests"

    id: int = Field(primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    book_id: int = Field(foreign_key="books.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relations
    user: User = Relationship(back_populates="requests")
    book: Book = Relationship(back_populates="requests")
    messages: List["Message"] = Relationship(back_populates="request")
    statuses: List["RequestStatus"] = Relationship(back_populates="request")


# -----------------------------
# REVIEWS
# -----------------------------
class Review(SQLModel, table=True):
    __tablename__ = "reviews"

    id: int = Field(primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    book_id: int = Field(foreign_key="books.id")
    review: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relations
    user: User = Relationship(back_populates="reviews")
    book: Book = Relationship(back_populates="reviews")


# -----------------------------
# MESSAGES
# -----------------------------
class Message(SQLModel, table=True):
    __tablename__ = "messages"

    id: int = Field(primary_key=True)
    request_id: int = Field(foreign_key="requests.id")
    user_author_id: int = Field(foreign_key="users.id")
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relations
    request: Request = Relationship(back_populates="messages")
    author: User = Relationship(back_populates="messages")


# -----------------------------
# BOOK CATEGORIES
# -----------------------------
class BookCategory(SQLModel, table=True):
    __tablename__ = "book_categories"

    id: int = Field(primary_key=True)
    name: str = Field(max_length=255)

    # Relations
    books: List[Book] = Relationship(back_populates="category")


# -----------------------------
# BOOK AVAILABILITIES
# -----------------------------
class BookAvailability(SQLModel, table=True):
    __tablename__ = "book_availabilities"

    id: int = Field(primary_key=True)
    name: str = Field(max_length=255)

    # Relations
    books: List[Book] = Relationship(back_populates="availability")


# -----------------------------
# REQUEST STATUSES
# -----------------------------
class RequestStatus(SQLModel, table=True):
    __tablename__ = "request_statuses"

    id: int = Field(primary_key=True)
    request_id: int = Field(foreign_key="requests.id")
    status: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relations
    request: Request = Relationship(back_populates="statuses")