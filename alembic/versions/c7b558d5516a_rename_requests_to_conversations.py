"""rename requests to conversations

Revision ID: c7b558d5516a
Revises: cd2ce15d707f
Create Date: 2026-01-30 14:51:10.449318

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy import text

# revision identifiers, used by Alembic.
revision: str = 'c7b558d5516a'
down_revision: Union[str, Sequence[str], None] = 'cd2ce15d707f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def table_exists(table_name: str) -> bool:
    conn = op.get_bind()
    result = conn.execute(text(
        "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = :t)"
    ), {"t": table_name})
    return result.scalar()

def column_exists(table_name: str, column_name: str) -> bool:
    conn = op.get_bind()
    result = conn.execute(text(
        "SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = :t AND column_name = :c)"
    ), {"t": table_name, "c": column_name})
    return result.scalar()

def upgrade() -> None:
    if table_exists("requests"):
        op.rename_table("requests", "conversations")
    if table_exists("request_statuses"):
        op.rename_table("request_statuses", "conversation_statuses")
    if column_exists("messages", "request_id"):
        op.alter_column("messages", "request_id", new_column_name="conversation_id")
    if column_exists("messages", "user_author_id"):
        op.alter_column("messages", "user_author_id", new_column_name="sender_id")
    if column_exists("conversation_statuses", "request_id"):
        op.alter_column("conversation_statuses", "request_id", new_column_name="conversation_id")

def downgrade() -> None:
    if column_exists("messages", "sender_id"):
        op.alter_column("messages", "sender_id", new_column_name="user_author_id")
    if column_exists("messages", "conversation_id"):
        op.alter_column("messages", "conversation_id", new_column_name="request_id")
    if column_exists("conversation_statuses", "conversation_id"):
        op.alter_column("conversation_statuses", "conversation_id", new_column_name="request_id")
    if table_exists("conversation_statuses"):
        op.rename_table("conversation_statuses", "request_statuses")
    if table_exists("conversations"):
        op.rename_table("conversations", "requests")