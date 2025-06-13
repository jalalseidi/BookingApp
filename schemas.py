from pydantic import BaseModel, EmailStr
from enum import Enum
from datetime import datetime

class Role(str, Enum):
    customer = "customer"
    barber = "barber"

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Role

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


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
    phone_number: str | None = None

class Customer(BaseModel):
    id: int
    name: str
    email: str
    phone_number: str | None = None

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

class AvailabilityBase(BaseModel):
    start_time: datetime
    end_time: datetime

class AvailabilityCreate(AvailabilityBase):
    pass

class Availability(AvailabilityBase):
    id: int
    booking_id: int

    class Config:
        from_attributes = True
