import sqlite3

#Create a connection
conn = sqlite3.connect("homework.db")

#Create a cursor
cur = conn.cursor()
#Create a table for attendance
cur.execute("""CREATE TABLE IF NOT EXISTS
            homework (Name TEXT, "Week 1" TEXT, "Week 2" TEXT, "Week 3" TEXT, "Week 4" TEXT, 
            "Week 5" TEXT, "Week 6" TEXT, "Week 7" TEXT, "Week 8" TEXT, "Week 9" TEXT, "Week 10" TEXT)
            """)
#Insert Sample Data
sample_data_to_insert = [
    ("Samara", "Yes", "No", "No", "No", "No", "No", "No", "No", "No", "No"),
    ("Mazin", "Yes", "Yes", "No", "No", "No", "No", "No", "No", "No", "No"),
    ("Yashu", "Yes", "Yes", "Yes", "Yes", "No", "No", "No", "No", "No", "No"),
    ("Deep", "Yes", "No", "Yes", "Yes", "Yes", "Yes", "No", "No", "No", "No"),
    ("Brandon", "Yes", "Yes", "No", "Yes", "No", "No", "No", "No", "No", "No")
]
cur.executemany("""INSERT INTO homework VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", sample_data_to_insert)
#Commit and Close
conn.commit()
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")




