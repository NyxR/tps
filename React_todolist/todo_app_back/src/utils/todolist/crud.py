from sqlalchemy.orm import Session
from src.utils import models, schema

def create_todo(db: Session, todo: schema.TodoList):
    Todo = models.TodoList(**todo.dict())
    db.add(Todo)
    db.commit()
    db.refresh(Todo)
    return Todo

def get_todo(db: Session, id: int = None):
    if id is None:
        return db.query(models.TodoList).all()
    else:
        return db.query(models.TodoList).filter_by(id=id).first()

def update_todo(db: Session, todo_id: int, todo: schema.TodoList):
    Todo = db.query(models.TodoList).filter_by(id=todo_id).first()
    Todo.title = todo.title
    Todo.description = todo.description
    Todo.status = todo.status
    db.commit()
    db.refresh(Todo)
    return Todo

def delete_todo(db: Session, id: int):
    Todo = db.query(models.TodoList).filter_by(id=id).first()
    if Todo.status:
        db.delete(Todo)
        db.commit()
        return True
    else:
        return False

def todo_err_msg(message):
    return {
        'error': message
    }