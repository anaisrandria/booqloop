from fastapi import APIRouter, HTTPException
from sqlmodel import SQLModel, Session, select
from api.models import Message, Conversation, MessageCreate, User
from api.services import engine

router = APIRouter(prefix='/messages', tags=['messages']) 

@router.post('/')
def send_message(message: MessageCreate):
    with Session(engine) as session:
        conversation = session.get(Conversation, message.conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")

        new_message = Message(
            conversation_id=message.conversation_id, 
            sender_id=message.sender_id, 
            content=message.content
        )
        session.add(new_message)
        session.commit()
        session.refresh(new_message)
        return new_message
    
@router.get("/{conversation_id}")
def get_messages(conversation_id: int):
    with Session(engine) as session:
        statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
        messages = session.exec(statement).all()
        return messages

@router.get("/user/{user_id}")
def get_conversations(user_id: int):
    with Session(engine) as session:
        statement = select(Conversation).where(Conversation.user_id == user_id)
        conversations = session.exec(statement).all()
        return conversations