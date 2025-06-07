from pydantic import BaseModel

class ServiceCreate(BaseModel):
    name: str
    duration_minutes: int

class Service(BaseModel):
    id: int
    name: str
    duration_minutes: int

    class config:
        orm_mode = True

class CustomerCreate(BaseModel):
    name: str
    email: str

class Customer(BaseModel):
    id: int
    name: str
    email: str

    class config:
        orm_mode = True