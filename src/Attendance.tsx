import { useEffect, useState } from "react";
import "./Attendance.css";

type AttendanceStatus = "Present" | "Absent";
type AttendanceItem = { id: number; name: string; week1: AttendanceStatus; week2: AttendanceStatus; week3: AttendanceStatus; week4: AttendanceStatus; week5: AttendanceStatus; week6: AttendanceStatus; week7: AttendanceStatus; week8: AttendanceStatus; week9: AttendanceStatus; week10: AttendanceStatus; };

export function Attendance({ profile, setActiveTab }: { profile: { name: string; email: string; picture: string } | null; setActiveTab: (tab: string) => void }) {
    const [attendance, setAttendance] = useState<AttendanceItem | undefined>(undefined);
    const [selectedWeek, setSelectedWeek] = useState<string>("week1");
    const [status, setStatus] = useState<AttendanceStatus>("Present");

    useEffect(() => {
        if (profile) {
            fetch("http://localhost:8000/attendance")
                .then((response) => response.json())
                .then((data: AttendanceItem[]) => setAttendance(data.find(a => a.name === profile.name)))
                .catch((error) => console.error("Error fetching attendance:", error));
        }
    }, [profile]);

    const handleCheckIn = () => {
        if (attendance) {
            fetch(`http://localhost:8000/attendance/${attendance.id}?week=${selectedWeek}&status=${status}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((updatedAttendance: AttendanceItem) => setAttendance(updatedAttendance))
                .catch((error) => console.error("Error updating attendance:", error));
        }
    };

    if (!profile) {
        return (
            <>
                <h2>Attendance</h2>
                <p>
                    Please <button onClick={() => setActiveTab("login")}>log in</button> to view attendance.
                </p>
            </>
        );
    }

    return (
        <>
            <h2>Attendance</h2>
            <p>Welcome to Attendance, {profile.name}!</p>
            {attendance && (
                <div>
                    <div>
                        <label>
                            Select Week:
                            <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                                {[...Array(10)].map((_, i) => (
                                    <option key={`week${i + 1}`} value={`week${i + 1}`}>{`Week ${i + 1}`}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Status:
                            <select value={status} onChange={(e) => setStatus(e.target.value as AttendanceStatus)}>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                            </select>
                        </label>
                    </div>
                    <button onClick={handleCheckIn}>Check In</button>
                </div>
            )}
            {attendance && (
                <div>
                    <p>Week 1: {attendance.week1}</p>
                    <p>Week 2: {attendance.week2}</p>
                    <p>Week 3: {attendance.week3}</p>
                    <p>Week 4: {attendance.week4}</p>
                    <p>Week 5: {attendance.week5}</p>
                    <p>Week 6: {attendance.week6}</p>
                    <p>Week 7: {attendance.week7}</p>
                    <p>Week 8: {attendance.week8}</p>
                    <p>Week 9: {attendance.week9}</p>
                    <p>Week 10: {attendance.week10}</p>
                </div>
            )}
        </>
    );
}