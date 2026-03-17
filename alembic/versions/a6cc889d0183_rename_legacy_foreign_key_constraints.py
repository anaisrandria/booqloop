"""rename legacy foreign key constraints

Revision ID: a6cc889d0183
Revises: 4edee071a000
Create Date: 2026-01-30 15:48:10.394112

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a6cc889d0183'
down_revision: Union[str, Sequence[str], None] = '4edee071a000'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # conversations.user_id
    op.execute("""
        ALTER TABLE conversations
        RENAME CONSTRAINT requests_user_id_fkey
        TO conversations_user_id_fkey
    """)

    # conversations.book_id
    op.execute("""
        ALTER TABLE conversations
        RENAME CONSTRAINT requests_book_id_fkey
        TO conversations_book_id_fkey
    """)

    # conversation_statuses.conversation_id
    op.execute("""
        ALTER TABLE conversation_statuses
        RENAME CONSTRAINT request_statuses_request_id_fkey
        TO conversation_statuses_conversation_id_fkey
    """)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("""
        ALTER TABLE conversations
        RENAME CONSTRAINT conversations_user_id_fkey
        TO requests_user_id_fkey
    """)

    op.execute("""
        ALTER TABLE conversations
        RENAME CONSTRAINT conversations_book_id_fkey
        TO requests_book_id_fkey
    """)

    op.execute("""
        ALTER TABLE conversation_statuses
        RENAME CONSTRAINT conversation_statuses_conversation_id_fkey
        TO request_statuses_request_id_fkey
    """)
