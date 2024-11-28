import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="navbar">
        <nav>
          <ul>
            <li><a href="#attendance">Attendance</a></li>
            <li><a href="#lecture-slides">Lecture Slides</a></li>
            <li><a href="#hw-assignments">HW Assignments</a></li>
            <li><a href="#mentor-groups">Mentor Groups</a></li>
          </ul>
        </nav>
      </header>
      <main className="welcome-section">
        <h1>Welcome to the Bootcamp Portal!</h1>
        <p>Your gateway to managing attendance, accessing lecture slides, completing assignments, and connecting with mentors.</p>
      </main>
    </div>
  );
};

export default App;
