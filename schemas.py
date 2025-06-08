from pydantic import BaseModel
from datetime import datetime

class ServiceCreate(BaseModel):
    name: str
    duration_minutes: int

class Service(BaseModel):
    id: int
    name: str
    duration_minutes: int

    class Config:
        from_attributes = True

class CustomerCreate(BaseModel):
    name: str
    email: str

class Customer(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

class BookingBase(BaseModel):
    customer_id: int
    service_id: int
    booking_time: datetime

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int

    class Config:
        from_attributes = True
