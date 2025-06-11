from sqlalchemy import Column,Integer,String, ForeignKey, DateTime
from database import Base
from sqlalchemy import Enum as SQLAEnum
import enum
from sqlalchemy.orm import relationship

class Service(Base):
    __tablename__ = 'service'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    duration_minutes = Column(Integer)

class Customer(Base):
    __tablename__ = 'customer'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, nullable=True)

class UserRole(str, enum.Enum):
    customer = "customer"
    barber = "barber"

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(SQLAEnum(UserRole), nullable=False)

class Booking(Base):
    __tablename__ = 'booking'

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey('customer.id'))
    service_id = Column(Integer, ForeignKey('service.id'))
    booking_time = Column(DateTime, nullable=False)

    customer = relationship('Customer')
    service = relationship('Service')