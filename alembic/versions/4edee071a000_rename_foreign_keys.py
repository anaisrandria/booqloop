"""rename foreign keys

Revision ID: 4edee071a000
Revises: c7b558d5516a
Create Date: 2026-01-30 15:44:18.398340

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4edee071a000'
down_revision: Union[str, Sequence[str], None] = 'c7b558d5516a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint(
        "messages_user_author_id_fkey",
        "messages",
        type_="foreignkey"
    )
    op.drop_constraint(
        "messages_request_id_fkey",
        "messages",
        type_="foreignkey"
    )

    op.create_foreign_key(
        "messages_sender_id_fkey",
        "messages",
        "users",
        ["sender_id"],
        ["id"]
    )

    op.create_foreign_key(
        "messages_conversation_id_fkey",
        "messages",
        "conversations",
        ["conversation_id"],
        ["id"]
    )



def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint("messages_sender_id_fkey", "messages", type_="foreignkey")
    op.drop_constraint("messages_conversation_id_fkey", "messages", type_="foreignkey")

    op.create_foreign_key(
        "messages_user_author_id_fkey",
        "messages",
        "users",
        ["sender_id"],
        ["id"]
    )
    op.create_foreign_key(
        "messages_request_id_fkey",
        "messages",
        "conversations",
        ["conversation_id"],
        ["id"]
    )

