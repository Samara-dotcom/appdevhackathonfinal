import { useEffect, useState } from "react";

type AttendanceStatus = "Present" | "Absent"
type AttendanceItem = { name: string; week1: AttendanceStatus; week2: AttendanceStatus; week3: AttendanceStatus; week4: AttendanceStatus; week5: AttendanceStatus; week6: AttendanceStatus; week7: AttendanceStatus; week8: AttendanceStatus; week9: AttendanceStatus; week10: AttendanceStatus;};

export function Attendance({ profile, setActiveTab }: { profile: { name: string; email: string; picture: string } | null; setActiveTab: (tab: string) => void }) {
    if (!profile) return (
        <>
            <h2>Attendance</h2>
            <p>
                Please <button onClick={() => setActiveTab("login")}>log in</button> to view attendance.
            </p>
        </>
    );

    const [attendance, setAttendance] = useState<AttendanceItem| undefined>(undefined);

    useEffect(() => {
        fetch("http://localhost:8000/attendance")
            .then((response) => response.json())
            .then((data: AttendanceItem[]) => setAttendance(data.find(a => a.name === profile.name)))
            .catch((error) => {

            });
    }, [])

    return (
        <>
            <h2>Attendance</h2>
            <p>Welcome to Attendance, {profile.name}!</p>
            {attendance && 
            <div>
                <p> Week 1- {attendance.week1}</p>
                <p> Week 2- {attendance.week2}</p>
                <p> Week 3- {attendance.week3}</p>
                <p> Week 4- {attendance.week4}</p>
                <p> Week 5- {attendance.week5}</p>
                <p> Week 6- {attendance.week6}</p>
                <p> Week 7- {attendance.week7}</p>
                <p> Week 8- {attendance.week8}</p>
                <p> Week 9- {attendance.week9}</p>
                <p> Week 10-{attendance.week1}</p>
            </div>
            }
        </>
    );
}