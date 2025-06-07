from fastapi import FastAPI
from fastapi import Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from database import engine
import uvicorn
import models
from models import Service as ServiceModel
from schemas import ServiceCreate, Service
from typing import List
from models import Customer as CustomerModel
from schemas import CustomerCreate, Customer


models.Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/services/", response_model=Service)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    db_service = ServiceModel(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

@app.post("/customers/", response_model=Customer)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    db_customer = CustomerModel(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@app.get("/services/", response_model=List[Service])
def read_services(db: Session = Depends(get_db)):
    return db.query(ServiceModel).all()

@app.get("/customers/", response_model=List[Customer])
def get_customers(db: Session = Depends(get_db)):
    return db.query(CustomerModel).all()



if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
