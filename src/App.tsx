import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./components/GoogleLogin";
import "./App.css";
import Homework from "./Homework";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState<any>(null);

  const slideShows = [
    { title: "Lecture 1", link: "https://docs.google.com/presentation/d/1VP9mrEZJZ9ALk2dBwadcGkWBg5twjUbM6VFZ7Fn3Vkk/edit?usp=sharing" },
    { title: "Lecture 2", link: "https://docs.google.com/presentation/d/1wO047LhrT73QIcC5WzFhzGOtYhxap3aPq-nYbjmOSKk/edit?usp=sharing" },
    { title: "Lecture 3", link: "https://docs.google.com/presentation/d/1RWvO8TQ_ueJyBdSHfZ6oNvq9E6J3rYovItbX_Q-r-44/edit?usp=sharing" },
    { title: "Lecture 4", link: "https://docs.google.com/presentation/d/14ooPTPyM4QZPWMBq2sg4NypMQZAHQ4rY5n6CUn6l7zI/edit?usp=sharing" },
    { title: "Lecture 5", link: "https://docs.google.com/presentation/d/1YzEswdGs5zqZMaK8zPCaJl8PiiFFOYDnz2QVHLDAxak/edit?usp=sharing" },
    { title: "Lecture 6", link: "https://docs.google.com/presentation/d/1GTiIFoT1EDLZ0Y9SC6G1f9c1-YZoMM-NMLOC8-0_-lI/edit?usp=sharing" },
  ];

  const [currentSlideShow, setCurrentSlideShow] = useState(0);

  const handleLoginSuccess = (userInfo: any) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="App">
        <header className="navbar">
          <nav>
            <ul>
              <li>
                <button onClick={() => setActiveTab("home")}>Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("lecture-slides")}>
                  Lecture Slides
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("attendance")}>
                  Attendance
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("hw-assignments")}>
                  HW Assignments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("mentor-groups")}>
                  Mentor Groups
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("login")}>Login</button>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main-content">
          {activeTab === "home" && (
            <div className="welcome-section">
              <h1 id="mainHeading">Welcome to the Bootcamp Portal!</h1>
              <p id="underHeading">
                Your gateway to managing attendance, accessing lecture slides,
                completing assignments, and connecting with mentors.
              </p>
            </div>
          )}

          {activeTab === "lecture-slides" && (
            <section id="lecture-slides">
              <h2>Lecture Slides</h2>
              <div className="lecture-buttons">
                {slideShows.map((slideShow, index) => (
                  <button key={index} onClick={() => setCurrentSlideShow(index)}>
                    {slideShow.title}
                  </button>
                ))}
              </div>
              <iframe
                src={`https://docs.google.com/presentation/d/${slideShows[currentSlideShow].link
                  .split("/d/")[1]
                  .split("/")[0]}/embed`}
                width="960"
                height="569"
                style={{ border: "none" }}
                allowFullScreen={true}
              ></iframe>
            </section>
          )}

          {activeTab === "attendance" && (
            <section id="attendance">
              <h2>Attendance</h2>
              {!user ? (
                <p>
                  You must <button onClick={() => setActiveTab("login")}>log in</button> to access this section.
                </p>
              ) : (
                <p>Welcome to the Attendance Section!</p>
              )}
            </section>
          )}

          {activeTab === "hw-assignments" && (
            <section id="hw-assignments">
              <Homework />
            </section>
          )}

          {activeTab === "mentor-groups" && (
            <section id="mentor-groups">
              <h2>Match with a mentor!</h2>
              <p>
                Welcome to the Mentor Groups section! Here, you can find mentors that
                match your interests and goals. Please take a moment to complete the
                survey to help us pair you with the best mentor for your journey.
              </p>
              <a
                href="https://forms.gle/EArwmQ1CKQYXxueLA"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#1B3B6F",
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  display: "inline-block",
                  marginTop: "20px",
                }}
              >
                Fill Out the Mentor Survey
              </a>
            </section>
          )}

          {activeTab === "login" && (
            <section id="login">
              {!user ? (
                <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  <h3>Welcome, {user.name}!</h3>
                  <img src={user.picture} alt="User" />
                  <p>{user.email}</p>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;

