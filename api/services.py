from sqlmodel import SQLModel, create_engine
from api import models

DATABASE_URL = 'postgresql+psycopg2://booqloop:booqloop@localhost:5432/booqloop'

engine = create_engine(DATABASE_URL)

def init_db():
    SQLModel.metadata.create_all(engine)