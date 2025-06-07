from sqlalchemy import Column,Integer,String
from database import Base

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