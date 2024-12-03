import sqlite3

#Create a connection
conn = sqlite3.connect("../attendance.db")

#Create a cursor
cur = conn.cursor()
#Create a table for attendance/homework
cur.execute("""CREATE TABLE IF NOT EXISTS attendance (
            name TEXT, 
            "week1" TEXT,
            "week2" TEXT,
            "week3" TEXT,
            "week4" TEXT,
            "week5" TEXT,
            "week6" TEXT,
            "week7" TEXT,
            "week8" TEXT,
            "week9" TEXT,
            "week10" TEXT
)""")
cur.execute("""DELETE FROM attendance""")
#Insert Sample Data
sample_data_to_insert = [
    ("Samara Rahman", "Present", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent"),
    ("Mazinkhan Nadaf", "Present", "Present", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent"),
    ("Yasaswini Bommareddy", "Present", "Present", "Present", "Present", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent"),
    ("Deep Mistry", "Present", "Absent", "Present", "Present", "Present", "Present", "Absent", "Absent", "Absent", "Absent"),
    ("Brandon Isbell", "Present", "Present", "Absent", "Present", "Absent", "Absent", "Absent", "Absent", "Absent", "Absent")
]
cur.executemany("""INSERT INTO attendance(name, week1,
week2,
week3,
week4,
week5,
week6,
week7,
week8,
week9,
week10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", sample_data_to_insert)
#Commit and Close
conn.commit()
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")




