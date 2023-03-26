from fastapi import APIRouter, Depends, HTTPException, Query
from src.database import _db
from typing import Optional
from src.utils.schema import TodoList
from src.utils.todolist.crud import create_todo, update_todo, delete_todo, get_todo, todo_err_msg

router = APIRouter(
    prefix="/api/todos",
    tags=["Todo"],
)

@router.get("/")
async def get_todos(id: int = Query(default=None), db=Depends(_db)):
    Todo = get_todo(db, id)
    if Todo:
        return Todo
    else:
        raise HTTPException(404, todo_err_msg("No todo found"))

@router.post("/create")
async def add_todo(todo: TodoList, db=Depends(_db)):
    return create_todo(db, todo)

@router.delete("/{todo_id}")
async def del_todo(todo_id: int, db=Depends(_db)):
    response = delete_todo(db, id=todo_id)
    return {"response": response}

@router.put("/{todo_id}")
async def modif_todo(todo_id: int, todo: TodoList, db=Depends(_db)):
    return update_todo(db, todo_id, todo)