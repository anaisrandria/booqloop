from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import SQLModel, Session, select
from api.models import Book, ConversationCreate, Message, Conversation
from api.security import get_current_user
from api.services import engine

router = APIRouter(prefix='/conversations', tags=['conversations'])

@router.post("/")
def create_conversation(conversation: ConversationCreate, user_id: int = Depends(get_current_user)):
    """
    Crée une nouvelle conversation entre l'utilisateur connecté et le propriétaire d'un livre.

    Si une conversation existe déjà pour ce livre et cet emprunteur,
    elle est retournée sans en créer une nouvelle.

    Args:
        conversation: Les données de la conversation (book_id).
        user_id: L'identifiant de l'emprunteur (extrait du cookie).

    Raises:
        HTTPException 404: Si le livre n'existe pas.

    Returns:
        La conversation existante ou nouvellement créée.
    """
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
def get_conversations(user_id: int = Depends(get_current_user)):
    """
    Retourne toutes les conversations de l'utilisateur connecté.

    Inclut les conversations où l'utilisateur est emprunteur
    et celles où il est propriétaire du livre.

    Args:
        user_id: L'identifiant de l'utilisateur connecté (extrait du cookie).

    Returns:
        La liste des conversations de l'utilisateur.
    """
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
def get_messages(conversation_id: int, user_id: int = Depends(get_current_user)):
    """
    Retourne les messages d'une conversation, triés par date.

    Seuls les participants à la conversation (emprunteur ou propriétaire
    du livre) peuvent accéder aux messages.

    Args:
        conversation_id: L'identifiant de la conversation.
        user_id: L'identifiant de l'utilisateur connecté (extrait du cookie).

    Raises:
        HTTPException 404: Si la conversation n'existe pas.
        HTTPException 403: Si l'utilisateur n'est pas participant à la conversation.

    Returns:
        La liste des messages triés par date de création.
    """
    with Session(engine) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        if user_id != conversation.borrower_id and user_id != conversation.book.user_id:
            raise HTTPException(status_code=403, detail="Not allowed")

        statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
        messages = session.exec(statement).all()
        return messages
    
# --- Envoyer un message ---
@router.post("/{conversation_id}/messages")
def send_message(conversation_id: int, message: dict, user_id: int = Depends(get_current_user)):
    """
    Envoie un message dans une conversation.

    Args:
        conversation_id: L'identifiant de la conversation.
        message: Le contenu du message sous forme de dictionnaire {"content": "..."}.
        user_id: L'identifiant de l'expéditeur (extrait du cookie).

    Raises:
        HTTPException 404: Si la conversation n'existe pas.

    Returns:
        Le message créé.
    """
    with Session(engine) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")

        new_message = Message(
            conversation_id=conversation_id,
            sender_id=user_id,
            content=message["content"]
        )
        session.add(new_message)
        session.commit()
        session.refresh(new_message)
        return new_message
