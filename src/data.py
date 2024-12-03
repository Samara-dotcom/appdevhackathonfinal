import sqlite3

#Create a connection
conn = sqlite3.connect("attendance.db")

#Create a cursor
cur = conn.cursor()
#Create a table for attendance/homework
cur.execute("""CREATE TABLE IF NOT EXISTS
            Attendance (Name TEXT, "Week1" TEXT, "Week2" TEXT, "Week3" TEXT, "Week4" TEXT, 
            "Week5" TEXT, "Week6" TEXT, "Week7" TEXT, "Week8" TEXT, "Week9" TEXT, "Week10" TEXT)
            """)
#Insert Sample Data
sample_data_to_insert = [
    ("Samara", "Yes", "No", "No", "No", "No", "No", "No", "No", "No", "No"),
    ("Mazin", "Yes", "Yes", "No", "No", "No", "No", "No", "No", "No", "No"),
    ("Yashu", "Yes", "Yes", "Yes", "Yes", "No", "No", "No", "No", "No", "No"),
    ("Deep", "Yes", "No", "Yes", "Yes", "Yes", "Yes", "No", "No", "No", "No"),
    ("Brandon", "Yes", "Yes", "No", "Yes", "No", "No", "No", "No", "No", "No")
]
cur.executemany("""INSERT INTO Attendance VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", sample_data_to_insert)
#Commit and Close
conn.commit()
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")




