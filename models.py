from sqlalchemy import Column,Integer,String
from database import Base
from sqlalchemy import ForeignKey, DateTime
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

class Booking(Base):
    __tablename__ = 'booking'

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey('customer.id'))
    service_id = Column(Integer, ForeignKey('service.id'))
    booking_time = Column(DateTime, nullable=False)

    customer = relationship('Customer')
    service = relationship('Service')