from src.database import Base
from sqlalchemy import Column, String, Integer, Boolean

class TodoList(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    status = Column(Boolean, default=False)

