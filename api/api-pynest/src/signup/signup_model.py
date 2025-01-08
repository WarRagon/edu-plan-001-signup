from pydantic import BaseModel

class Signup(BaseModel):
    id: str
    password: str

