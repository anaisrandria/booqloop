"""rename requests to conversations

Revision ID: c7b558d5516a
Revises: cd2ce15d707f
Create Date: 2026-01-30 14:51:10.449318

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'c7b558d5516a'
down_revision: Union[str, Sequence[str], None] = 'cd2ce15d707f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.rename_table("requests", "conversations")
    op.rename_table("request_statuses", "conversation_statuses")
    op.alter_column("messages", "request_id", new_column_name="conversation_id")
    op.alter_column("messages", "user_author_id", new_column_name="sender_id")
    op.alter_column("conversation_statuses", "request_id", new_column_name="conversation_id")

def downgrade() -> None:
    op.alter_column("messages", "sender_id", new_column_name="user_author_id")
    op.alter_column("messages", "conversation_id", new_column_name="request_id")
    op.alter_column("conversation_statuses", "conversation_id", new_column_name="request_id")
    op.rename_table("conversation_statuses", "request_statuses")
    op.rename_table("conversations", "requests")