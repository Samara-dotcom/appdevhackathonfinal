from sqlmodel import Field, SQLModel

# Define the Attendance model
class Attendance(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    week1: str | None = None
    week2: str | None = None
    week3: str | None = None
    week4: str | None = None
    week5: str | None = None
    week6: str | None = None
    week7: str | None = None
    week8: str | None = None
    week9: str | None = None
    week10: str | None = None
