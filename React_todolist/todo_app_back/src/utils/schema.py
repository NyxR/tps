from pydantic import BaseModel

class TodoList(BaseModel):
    title: str
    description: str
    status: bool

    class Config:
        orm_mode = True