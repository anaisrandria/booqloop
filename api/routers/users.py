from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from api.models import User
from api.security import get_current_user
from api.services import engine

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/me')
def get_me(user_id: int = Depends(get_current_user)):
    """
    Retourne les informations de l'utilisateur actuellement connecté.

    Args:
        user_id: L'identifiant de l'utilisateur connecté (extrait du cookie).

    Raises:
        HTTPException 404: Si l'utilisateur n'existe pas en base.

    Returns:
        L'identifiant et le nom d'utilisateur de l'utilisateur connecté.
    """
    with Session(engine) as session:
        user = session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Utilisateur introuvable")
        return {"user_id": user.id, "username": user.username}
    
@router.get('/{user_id}')
def get_user_by_id(user_id: int, current_user_id: int = Depends(get_current_user)):
    """
    Retourne les informations publiques d'un utilisateur par son identifiant.

    Nécessite d'être authentifié. Utilisée par exemple pour afficher
    le nom du propriétaire d'un livre dans une conversation.

    Args:
        user_id: L'identifiant de l'utilisateur à récupérer.
        current_user_id: L'identifiant de l'utilisateur connecté (extrait du cookie).

    Raises:
        HTTPException 404: Si l'utilisateur n'existe pas.

    Returns:
        L'identifiant et le nom d'utilisateur de l'utilisateur demandé.
    """
    with Session(engine) as session:
        user = session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"id": user.id, "username": user.username}
    