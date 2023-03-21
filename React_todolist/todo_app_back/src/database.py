from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from os import environ as env

#database url
DB_URL = "postgresql://{}:{}@todo_app_db:5432/{}".format(
    env['POSTGRES_USER'],
    env['POSTGRES_PASSWORD'],
    env['POSTGRES_DB']
)

engine = create_engine(DB_URL)
SessionMaker = sessionmaker(bind=engine)
Base = declarative_base()

def _db():
    try:
        instance = SessionMaker()
        yield instance
    finally:
        instance.close()
