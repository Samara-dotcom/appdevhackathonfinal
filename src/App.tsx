import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios"; // Keep only axios import
import "./App.css";
import Homework from "./Homework";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{ name: string; email: string; picture: string } | null>(null);

  const slideShows = [
    { title: "Lecture 1", link: "https://docs.google.com/presentation/d/1VP9mrEZJZ9ALk2dBwadcGkWBg5twjUbM6VFZ7Fn3Vkk/edit?usp=sharing" },
    { title: "Lecture 2", link: "https://docs.google.com/presentation/d/1wO047LhrT73QIcC5WzFhzGOtYhxap3aPq-nYbjmOSKk/edit?usp=sharing" },
    { title: "Lecture 3", link: "https://docs.google.com/presentation/d/1RWvO8TQ_ueJyBdSHfZ6oNvq9E6J3rYovItbX_Q-r-44/edit?usp=sharing" },
    { title: "Lecture 4", link: "https://docs.google.com/presentation/d/14ooPTPyM4QZPWMBq2sg4NypMQZAHQ4rY5n6CUn6l7zI/edit?usp=sharing" },
    { title: "Lecture 5", link: "https://docs.google.com/presentation/d/1YzEswdGs5zqZMaK8zPCaJl8PiiFFOYDnz2QVHLDAxak/edit?usp=sharing" },
    { title: "Lecture 6", link: "https://docs.google.com/presentation/d/1GTiIFoT1EDLZ0Y9SC6G1f9c1-YZoMM-NMLOC8-0_-lI/edit?usp=sharing" },
  ];

  const [currentSlideShow, setCurrentSlideShow] = useState(0);

  const login = useGoogleLogin({
    onSuccess: (response) => setUser(response),
    onError: (error) => alert("Login Failed: " + error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get<{ name: string; email: string; picture: string }>(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const logout = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId="647779260110-9r21p3vjfk4323hpndin60tav1t56ihq.apps.googleusercontent.com">
      <div className="App">
        <header className="navbar">
          <nav>
            <ul>
              <li>
                <button onClick={() => setActiveTab("home")}>Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("lecture-slides")}>Lecture Slides</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("attendance")}>Attendance</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("hw-assignments")}>HW Assignments</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("mentor-groups")}>Mentor Groups</button>
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
                Your gateway to managing attendance, accessing lecture slides, completing assignments, and connecting with mentors.
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
                src={`https://docs.google.com/presentation/d/${slideShows[currentSlideShow].link.split("/d/")[1].split("/")[0]}/embed`}
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
              {!profile ? (
                <p>
                  Please <button onClick={() => setActiveTab("login")}>log in</button> to view attendance.
                </p>
              ) : (
                <p>Welcome to Attendance, {profile.name}!</p>
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
              <h2>Mentor Groups</h2>
              <p>Find your mentor and survey link here!</p>
            </section>
          )}

          {activeTab === "login" && (
            <section id="login">
              {profile ? (
                <div>
                  <h3>Welcome, {profile.name}!</h3>
                  <img src={profile.picture} alt="User" />
                  <p>Email: {profile.email}</p>
                  <button onClick={logout}>Logout</button>
                </div>
              ) : (
                <button onClick={() => login()}>Sign in with Google</button>
              )}
            </section>
          )}
        </main>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;