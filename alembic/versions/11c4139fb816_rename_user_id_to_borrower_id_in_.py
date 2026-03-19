"""rename user_id to borrower_id in conversations

Revision ID: 11c4139fb816
Revises: a6cc889d0183
Create Date: 2026-01-30 16:59:35.467238

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import text


# revision identifiers, used by Alembic.
revision: str = '11c4139fb816'
down_revision: Union[str, Sequence[str], None] = 'a6cc889d0183'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def column_exists(table_name: str, column_name: str) -> bool:
    conn = op.get_bind()
    result = conn.execute(text(
        "SELECT EXISTS (SELECT 1 FROM information_schema.columns "
        "WHERE table_name = :t AND column_name = :c)"
    ), {"t": table_name, "c": column_name})
    return result.scalar()


def upgrade():
    # En DB de test la colonne s'appelle déjà borrower_id, on ne renomme que si user_id existe
    if column_exists("conversations", "user_id"):
        op.alter_column('conversations', 'user_id', new_column_name='borrower_id')


def downgrade():
    if column_exists("conversations", "borrower_id"):
        op.alter_column('conversations', 'borrower_id', new_column_name='user_id')