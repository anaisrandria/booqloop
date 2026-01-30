from datetime import date, datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship


# -----------------------------
# USERS
# -----------------------------
class UserBase(SQLModel):
    username: str = Field(max_length=255, unique=True, nullable=False)
    email: str = Field(max_length=255, unique=True, nullable=False)
    address: str = Field(max_length=255, nullable=False)
    postal_code: int
    country: str = Field(max_length=255, nullable=False)

class User(UserBase, table=True):
    __tablename__ = "users"

    id: int = Field(primary_key=True)
    hashed_password: str = Field(max_length=255, nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    # Relations
    books: List["Book"] = Relationship(back_populates="user")
    conversations: List["Conversation"] = Relationship(back_populates="user")
    reviews: List["Review"] = Relationship(back_populates="user")
    messages: List["Message"] = Relationship(back_populates="sender")

class UserCreate(UserBase):
    password: str = Field(max_length=255, nullable=False)

class UserRead(UserBase):
    id: int

class UserLogin(SQLModel):
    email: str
    password: str

# -----------------------------
# BOOKS
# -----------------------------
class BookBase(SQLModel):
    title: str = Field(max_length=255)
    author: str = Field(max_length=255)
    description: str
    published_year: Optional[int] = None
    image_url: str = Field(max_length=255)

class Book(BookBase, table=True):
    __tablename__ = "books"

    id: int = Field(primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    category_id: int = Field(foreign_key="book_categories.id")
    availability_status_id: int = Field(foreign_key="book_availabilities.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    # Relations
    user: User = Relationship(back_populates="books")
    category: "BookCategory" = Relationship(back_populates="books")
    availability: "BookAvailability" = Relationship(back_populates="books")
    conversations: List["Conversation"] = Relationship(back_populates="book")
    reviews: List["Review"] = Relationship(back_populates="book")

class BookCreate(BookBase):
    user_id: int
    category_id: Optional[int] = None
    availability_status_id: Optional[int] = None

# -----------------------------
# CONVERSATIONS
# -----------------------------
class Conversation(SQLModel, table=True):
    __tablename__ = "conversations"

    id: int = Field(primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    book_id: int = Field(foreign_key="books.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relations
    user: User = Relationship(back_populates="conversations")
    book: Book = Relationship(back_populates="conversations")
    messages: List["Message"] = Relationship(back_populates="conversation")
    statuses: List["ConversationStatus"] = Relationship(back_populates="conversation")


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
    conversation_id: int = Field(foreign_key="conversations.id")
    sender_id: int = Field(foreign_key="users.id")
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relations
    conversation: Conversation = Relationship(back_populates="messages")
    sender: User = Relationship(back_populates="messages")

class MessageCreate(SQLModel):
    conversation_id: int
    sender_id: int
    content: str

# -----------------------------
# BOOK CATEGORIES
# -----------------------------
class BookCategory(SQLModel, table=True):
    __tablename__ = "book_categories"

    id: int = Field(primary_key=True)
    name: str = Field(max_length=255)

    # Relations
    books: List[Book] = Relationship(back_populates="category")

class BookCategoryCreate(SQLModel):
    name: str

# -----------------------------
# BOOK AVAILABILITIES
# -----------------------------
class BookAvailability(SQLModel, table=True):
    __tablename__ = "book_availabilities"

    id: int = Field(primary_key=True)
    name: str = Field(max_length=255)

    # Relations
    books: List[Book] = Relationship(back_populates="availability")

class BookAvailabilityCreate(SQLModel):
    name: str

# -----------------------------
# CONVERSATION STATUSES
# -----------------------------
class ConversationStatus(SQLModel, table=True):
    __tablename__ = "conversation_statuses"

    id: int = Field(primary_key=True)
    conversation_id: int = Field(foreign_key="conversations.id")
    status: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relations
    conversation: Conversation = Relationship(back_populates="statuses")