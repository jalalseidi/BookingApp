from fastapi import FastAPI
from database import engine
import uvicorn
import models

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

@app.get("/")
def root():
    return {"message": "Barbershop API is running."}

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
