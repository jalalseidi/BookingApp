from database import SessionLocal, engine
import uvicorn
import models, schemas
from models import Service as ServiceModel
from typing import List
from models import Customer as CustomerModel
from schemas import CustomerCreate, Customer, ServiceCreate, Service, Booking
from fastapi import APIRouter, Depends, HTTPException, FastAPI
from sqlalchemy.orm import Session
from datetime import timedelta
from auth_routes import router as auth_router
from auth import require_role
from models import User
app = FastAPI()

models.Base.metadata.create_all(bind=engine)
app.include_router(auth_router)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Barbershop API is running."}



@app.post("/api/booking/", response_model=schemas.Booking)
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
@app.post("/api/services/", response_model=Service)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    db_service = ServiceModel(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

@app.post("/api/customers/", response_model=Customer)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    db_customer = CustomerModel(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@app.post("/api/availability/", response_model=schemas.Availability)
def create_availability(
    availability: schemas.AvailabilityCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("barber"))
):
    new_avail = models.Availability(
        start_time=availability.start_time,
        end_time=availability.end_time,
        barber_id=current_user.id,
    )
    db.add(new_avail)
    db.commit()
    db.refresh(new_avail)
    return new_avail


@app.get("/api/services/", response_model=List[Service])
def read_services(db: Session = Depends(get_db)):
    return db.query(ServiceModel).all()

@app.get("/api/customers/", response_model=List[Customer])
def get_customers(db: Session = Depends(get_db)):
    return db.query(CustomerModel).all()

@app.get("/api/bookings/", response_model=List[schemas.Booking])
def list_bookings(db: Session = Depends(get_db),
    current_user: User = Depends(require_role("barber"))
):
    return db.query(models.Booking).all()

@app.get("/api/availability/", response_model=List[schemas.Availability])
def list_availability(db: Session = Depends(get_db)):
    return db.query(models.Availability).all()



if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
