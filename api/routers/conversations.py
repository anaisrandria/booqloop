from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import SQLModel, Session, select
from api.models import Book, ConversationCreate, Message, Conversation
from api.security import get_current_user
from api.services import engine

router = APIRouter(prefix='/conversations', tags=['conversations'])

@router.post("/")
def create_conversation(conversation: ConversationCreate, user_id: str = Depends(get_current_user)):
    with Session(engine) as session:

        # Vérifier que le livre existe
        book = session.get(Book, conversation.book_id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")

        # Vérifier si la conversation existe déjà
        statement = select(Conversation).where(
            Conversation.borrower_id == user_id,
            Conversation.book_id == conversation.book_id
        )
        existing_conversation = session.exec(statement).first()

        if existing_conversation:
            return existing_conversation

        # Création de la conversation
        new_conversation = Conversation(
            borrower_id=user_id,
            book_id=conversation.book_id
        )

        session.add(new_conversation)
        session.commit()
        session.refresh(new_conversation)

        return new_conversation

# --- Liste des conversations de l'utilisateur connecté ---
@router.get("/")
def get_conversations(user_id: str = Depends(get_current_user)):
    with Session(engine) as session:
        statement = (
            select(Conversation)
            .join(Book, Book.id == Conversation.book_id)
            .where(
                (Conversation.borrower_id == int(user_id)) |
                (Book.user_id == int(user_id))
            )
        )
        conversations = session.exec(statement).all()
        # if not conversations:
        #     raise HTTPException(status_code=404, detail="Conversation not found")
        return conversations

# --- Messages d'une conversation ---
@router.get("/{conversation_id}/messages")
def get_messages(conversation_id: int, user_id: str = Depends(get_current_user)):
    with Session(engine) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        if int(user_id) != conversation.borrower_id and int(user_id) != conversation.book.user_id:
            raise HTTPException(status_code=403, detail="Not allowed")

        statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
        messages = session.exec(statement).all()
        return messages
    
# --- Envoyer un message ---
@router.post("/{conversation_id}/messages")
def send_message(conversation_id: int, message: dict, user_id: str = Depends(get_current_user)):
    with Session(engine) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")

        new_message = Message(
            conversation_id=conversation_id,
            sender_id=int(user_id),
            content=message["content"]
        )
        session.add(new_message)
        session.commit()
        session.refresh(new_message)
        return new_message
