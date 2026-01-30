"""rename user_id to borrower_id in conversations

Revision ID: 11c4139fb816
Revises: a6cc889d0183
Create Date: 2026-01-30 16:59:35.467238

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '11c4139fb816'
down_revision: Union[str, Sequence[str], None] = 'a6cc889d0183'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.alter_column('conversations', 'user_id', new_column_name='borrower_id')

def downgrade():
    op.alter_column('conversations', 'borrower_id', new_column_name='user_id')
