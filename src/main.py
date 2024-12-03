from fastapi import FastAPI, Depends, HTTPException, Path, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine, select

# Database tables
# BaseModel -> SQLModel -> TweetBase
class AttendanceBase(SQLModel): # SQLModel also happens to be a BaseModel, user passes in TweetBase
    Name: str = Field(description="Student name")
    Week1: str = Field(max_length=10, description="Whether or not the student was present in week 1.")
    Week2: str = Field(max_length=10, description="Whether or not the student was present in week 2.")
    Week3: str = Field(max_length=10, description="Whether or not the student was present in week 3.")
    Week4: str = Field(max_length=10, description="Whether or not the student was present in week 4.")
    Week5: str = Field(max_length=10, description="Whether or not the student was present in week 5.")
    Week6: str = Field(max_length=10, description="Whether or not the student was present in week 6.")
    Week7: str = Field(max_length=10, description="Whether or not the student was present in week 7.")
    Week8: str = Field(max_length=10, description="Whether or not the student was present in week 8.")
    Week9: str = Field(max_length=10, description="Whether or not the student was present in week 9.")
    Week10: str = Field(max_length=10, description="Whether or not the student was present in week 10.")
    

class Attendance(AttendanceBase, table=True): # I return Tweet
    id: int | None = Field(default=None, primary_key=True) # Field can let you specify certain things about the columns


# Setting up to connect to the database
# This stuff is just required for the engine to run
sqlite_database_name = "../attendance.db"
sqlite_url = f"sqlite:///{sqlite_database_name}"

# Allowing connections from multiple threads
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    
# Creating the session, the session communicates with the database
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    
# Django -> backend ----> HTML CSSS

# One backend, one frontend, running on two different servers, they're commmunicating with eachother
# Front developers -> frontend, backend developers -> backend 

@app.get("/attendance")
async def get_attendance(
    session: SessionDep, 
    ):
        return session.exec(select(Attendance)).all()
        

@app.post("/attendance/new", response_model=Attendance)
async def post_attendance(a: AttendanceBase, session: SessionDep):
    db_attendance = Attendance(**a.dict())
    #db_attendance = Attendance.model_validate(a) # creates an ID 
    session.add(db_attendance)
    session.commit()
    session.refresh(db_attendance)
    return db_attendance

@app.delete("/attendance/{tweet_id}")
def delete_attendance(tweet_id: Annotated[int, Path(ge=0)], session: SessionDep):
    tweet = session.get(Attendance, tweet_id)
    if not tweet:
        raise HTTPException(status_code=404, detail="Attendance row not found")
    session.delete(tweet)
    session.commit()
    return {"ok": True}