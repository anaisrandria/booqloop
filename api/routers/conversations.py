from fastapi import APIRouter, HTTPException
from sqlmodel import SQLModel, Session, select
from api.models import Book, ConversationCreate, Message, Conversation
from api.services import engine

router = APIRouter(prefix='/conversations', tags=['conversations'])

@router.post("/")
def create_conversation(conversation: ConversationCreate):
    with Session(engine) as session:

        # Vérifier que le livre existe
        book = session.get(Book, conversation.book_id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")

        # Vérifier si la conversation existe déjà
        statement = select(Conversation).where(
            Conversation.borrower_id == conversation.borrower_id,
            Conversation.book_id == conversation.book_id
        )
        existing_conversation = session.exec(statement).first()

        if existing_conversation:
            return existing_conversation

        # Création de la conversation
        new_conversation = Conversation(
            borrower_id=conversation.borrower_id,
            book_id=conversation.book_id
        )

        session.add(new_conversation)
        session.commit()
        session.refresh(new_conversation)

        return new_conversation

# --- Liste des conversations de l'utilisateur connecté ---
@router.get("/{user_id}")
def get_conversations(user_id: int):
    with Session(engine) as session:
        statement = (
            select(Conversation)
            .join(Book, Book.id == Conversation.book_id)
            .where(
                (Conversation.borrower_id == user_id) |
                (Book.user_id == user_id)
            )
        )
        conversations = session.exec(statement).all()
        # if not conversations:
        #     raise HTTPException(status_code=404, detail="Conversation not found")
        return conversations

# --- Messages d'une conversation ---
@router.get("/{conversation_id}/messages")
def get_messages(conversation_id: int):
    with Session(engine) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
        messages = session.exec(statement).all()
        return messages
    
# --- Envoyer un message ---
@router.post("/{conversation_id}/messages")
def send_message(conversation_id: int, message: dict):
    print(f"🍎 SEND MESSAGE", conversation_id, message)
    with Session(engine) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")

        new_message = Message(
            conversation_id=conversation_id,
            sender_id=message["sender_id"],
            content=message["content"]
        )
        session.add(new_message)
        session.commit()
        session.refresh(new_message)
        return new_message
