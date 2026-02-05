from fastapi import APIRouter, HTTPException
from sqlmodel import SQLModel, Session, select
from api.models import Message, Conversation, MessageCreate, User
from api.services import engine

router = APIRouter(prefix='/conversations', tags=['conversations']) 

# --- Liste des conversations ---
@router.get("/")
def get_conversations():
    with Session(engine) as session:
        conversations = session.exec(
            select(Conversation).order_by(Conversation.created_at.desc())
        ).all()
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
