"""update default books

Revision ID: cd2ce15d707f
Revises: 1b929726ee33
Create Date: 2025-11-21 11:19:48.834630

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cd2ce15d707f'
down_revision: Union[str, Sequence[str], None] = '1b929726ee33'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("""
        DELETE FROM books
        WHERE id IN (19, 20);
    """)

    op.execute("""
        INSERT INTO books (user_id, title, author, description, published_year, category_id, image_url, availability_status_id, created_at, updated_at)
        SELECT *
        FROM (VALUES
            (1, 'Le Vieil Homme et la Mer', 'Ernest Hemingway', 'Histoire d’un vieux pêcheur luttant contre un énorme marlin.', 1952, 1, 'https://covers.openlibrary.org/b/isbn/9780684801223-L.jpg', 1, NOW(), NOW()),
            (1, 'Fahrenheit 451', 'Ray Bradbury', 'Roman dystopique où les livres sont brûlés pour contrôler la société.', 1953, 2, 'https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg', 1, NOW(), NOW())
        ) AS v(user_id, title, author, description, published_year, category_id, image_url, availability_status_id, created_at, updated_at)
        WHERE NOT EXISTS (
            SELECT 1 FROM books b WHERE b.title = v.title AND b.author = v.author
        );
    """)
    

def downgrade() -> None:
    """Downgrade schema."""
    pass
