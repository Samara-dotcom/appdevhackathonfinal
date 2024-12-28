from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel, create_engine
from backend.data import Attendance  # Import Attendance model from data.py

# Initialize the FastAPI app
app = FastAPI()

# Allow CORS for all origins (adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up the database engine
DATABASE_URL = "sqlite:///attendance.db"
engine = create_engine(DATABASE_URL)

# Initialize the database
def initialize_database():
    SQLModel.metadata.create_all(engine)

# Initialize the database at application startup
initialize_database()

# Example GET endpoint: Retrieve all attendance records
@app.get("/attendance/")
def get_attendance():
    with Session(engine) as session:
        records = session.query(Attendance).all()
        return records

# Example POST endpoint: Add a new attendance record
@app.post("/attendance/")
def add_attendance(attendance: Attendance):
    with Session(engine) as session:
        session.add(attendance)
        session.commit()
        session.refresh(attendance)
        return attendance

# Example PUT endpoint: Update an attendance record by ID
@app.put("/attendance/{attendance_id}")
def update_attendance(attendance_id: int, attendance: Attendance):
    with Session(engine) as session:
        db_record = session.get(Attendance, attendance_id)
        if not db_record:
            raise HTTPException(status_code=404, detail="Record not found")
        
        for key, value in attendance.dict(exclude_unset=True).items():
            setattr(db_record, key, value)
        
        session.commit()
        session.refresh(db_record)
        return db_record

# Example DELETE endpoint: Delete an attendance record by ID
@app.delete("/attendance/{attendance_id}")
def delete_attendance(attendance_id: int):
    with Session(engine) as session:
        db_record = session.get(Attendance, attendance_id)
        if not db_record:
            raise HTTPException(status_code=404, detail="Record not found")
        
        session.delete(db_record)
        session.commit()
        return {"detail": "Record deleted"}