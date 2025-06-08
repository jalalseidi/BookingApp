from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import uvicorn
import models, schemas
from models import Service as ServiceModel
from schemas import ServiceCreate, Service, Booking
from typing import List
from models import Customer as CustomerModel
from schemas import CustomerCreate, Customer
from datetime import timedelta


models.Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Barbershop API is running."}


@app.post("/booking/", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    # Validate customer exists
    customer = db.query(models.Customer).filter(models.Customer.id == booking.customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    # Validate service exists
    service = db.query(models.Service).filter(models.Service.id == booking.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    # Calculate booking end time
    booking_start = booking.booking_time
    booking_end = booking_start + timedelta(minutes=service.duration_minutes)

    # Check for overlapping bookings
    overlapping = db.query(models.Booking).filter(
        models.Booking.service_id == booking.service_id,
        models.Booking.booking_time < booking_end,
        (models.Booking.booking_time + timedelta(minutes=service.duration_minutes)) > booking_start
    ).first()

    if overlapping:
        raise HTTPException(status_code=400, detail="Time slot already booked for this service.")

    # Create booking
    db_booking = models.Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking
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

@app.get("/bookings/", response_model=List[schemas.Booking])
def list_bookings(db: Session = Depends(get_db)):
    return db.query(models.Booking).all()



if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
