"""add default categories and availabilities

Revision ID: 48f56d3447a1
Revises: c762ec9bc075
Create Date: 2025-11-21 11:28:56.215347

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '48f56d3447a1'
down_revision: Union[str, Sequence[str], None] = 'c762ec9bc075'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("""
        INSERT INTO book_categories (name)
        SELECT v.name
        FROM (VALUES
            ('Littérature'),
            ('Science fiction'),
            ('Fantasy'),
            ('Romance'),
            ('Jeunesse'),
            ('Bande dessinée / Manga'),
            ('Développement personnel'),
            ('Histoire'),
            ('Sciences et Technologies'),
            ('Philosophie'),
            ('Économie et Gestion'),
            ('Art et Culture'),
            ('Cuisine'),
            ('Santé et Bien-être'),
            ('Voyage'),
            ('Policier / Thriller'),
            ('Documentaire / Essai'),
            ('Éducation / Pédagogie'),
            ('Pratique / Loisirs')
        ) AS v(name)
        WHERE NOT EXISTS (
            SELECT 1 FROM book_categories bc WHERE bc.name = v.name
        );
    """)

    op.execute("""
        INSERT INTO book_availabilities (name)
        SELECT v.name
        FROM (VALUES
            ('Disponible'),
            ('Indisponible'),
            ('Prêt en cours')
        ) AS v(name)
        WHERE NOT EXISTS (
            SELECT 1 FROM book_availabilities ba WHERE ba.name = v.name
        );
    """)


def downgrade() -> None:
    """Downgrade schema."""
    pass
