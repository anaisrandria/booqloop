"""add default books

Revision ID: 1b929726ee33
Revises: 48f56d3447a1
Create Date: 2025-11-21 11:10:19.688341

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1b929726ee33'
down_revision: Union[str, Sequence[str], None] = '48f56d3447a1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("""
        INSERT INTO books (user_id, title, author, description, published_year, category_id, image_url, availability_status_id, created_at, updated_at)
        SELECT *
        FROM (VALUES
            (1, '1984', 'George Orwell', 'Roman dystopique classique sur la surveillance et le totalitarisme.', 1949, 2, 'https://covers.openlibrary.org/b/isbn/0451524934-L.jpg', 1, NOW(), NOW()),
            (1, 'Orgueil et Préjugés', 'Jane Austen', 'Histoire d’amour et de société dans l’Angleterre du XIXe siècle.', 1813, 5, 'https://covers.openlibrary.org/b/isbn/0141439513-L.jpg', 1, NOW(), NOW()),
            (1, 'Le Petit Prince', 'Antoine de Saint‑Exupéry', 'Conte poétique et philosophique, réflexion sur l’enfance et l’amitié.', 1943, 6, 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg', 1, NOW(), NOW()),
            (1, 'Sapiens : Une brève histoire de l’humanité', 'Yuval Noah Harari', 'Réflexion historique et philosophique sur l’évolution de l’Homme.', 2011, 11, 'https://covers.openlibrary.org/b/isbn/9780099590088-L.jpg', 1, NOW(), NOW()),
            (1, 'Le Meilleur des mondes', 'Aldous Huxley', 'Roman dystopique utopique et sombre.', 1932, 2, 'https://covers.openlibrary.org/b/isbn/0060850523-L.jpg', 1, NOW(), NOW()),
            (1, 'La Route', 'Cormac McCarthy', 'Roman post-apocalyptique, père et fils luttant pour survivre.', 2006, 1, 'https://covers.openlibrary.org/b/isbn/9780307387899-L.jpg', 1, NOW(), NOW()),
            (1, 'Le Nom de la Rose', 'Umberto Eco', 'Roman historique et policier dans une abbaye médiévale.', 1980, 1, 'https://covers.openlibrary.org/b/isbn/9780156001311-L.jpg', 1, NOW(), NOW()),
            (1, 'Éducation', 'Tara Westover', 'Autobiographie sur l’émancipation et l’éducation.', 2018, 16, 'https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg', 1, NOW(), NOW()),
            (1, 'Le Guide Culinaire', 'Auguste Escoffier', 'Recueil classique des recettes de la grande cuisine française.', 1903, 15, 'https://covers.openlibrary.org/b/isbn/2082008037-L.jpg', 1, NOW(), NOW()),
            (1, 'To Kill a Mockingbird', 'Harper Lee', 'Roman sur l’innocence, la justice et les préjugés dans le Sud des États-Unis.', 1960, 1, 'https://covers.openlibrary.org/b/isbn/9780446310789-L.jpg', 1, NOW(), NOW())
        ) AS v(user_id, title, author, description, published_year, category_id, image_url, availability_status_id, created_at, updated_at)
        WHERE NOT EXISTS (
            SELECT 1 FROM books b WHERE b.title = v.title AND b.author = v.author
        );
    """)


def downgrade() -> None:
    """Downgrade schema."""
    pass
