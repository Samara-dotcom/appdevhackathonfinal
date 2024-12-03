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
                <button onClick={() => setActiveTab("resources")}>Resources</button>
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
              <a href="https://appdevclub.com/" target="_blank">
                <img src="appdev_favicon.png" alt="app dev logo" id="app_dev_logo"></img>
              </a>
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
    <p>
      We would love your feedback! Please fill out the following survey to
      let us know your preferences for mentor matching.
    </p>
    <a
      href="https://forms.gle/JaJnodqBaDrXuQEm6"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#1B3B6F", textDecoration: "underline" }}
    >
      Click here to fill out the mentor survey
    </a>

    {/* Mentor Groups Layout */}
    <div className="mentor-groups-container">
      <div className="group-card">
        <h3>SWE/Quant</h3>
        <p><strong>Mentors:</strong> Spencer, Phoebe</p>
        <div className="members">
          <div className="member">Lakshmee Harivanam</div>
          <div className="member">Joseph Acquah</div>
          <div className="member">Milana Dagne</div>
          <div className="member">Jayant Kammula</div>
          <div className="member">Uriel Vit-Ojiegbe</div>
        </div>
      </div>
      <div className="group-card">
        <h3>AI Research</h3>
        <p><strong>Mentors:</strong> Phillip, Aaquib</p>
        <div className="members">
          <div className="member">Pranav Krishnamurthy</div>
          <div className="member">Misha Khan</div>
          <div className="member">Cedric Pierre-Louis</div>
          <div className="member">Harini Thirukonda</div>
          <div className="member">Emily Lawrence</div>
        </div>
      </div>
      <div className="group-card">
        <h3>Quant</h3>
        <p><strong>Mentors:</strong> Aditya, Sam</p>
        <div className="members">
          <div className="member">Deep Mistry</div>
          <div className="member">Samara Rahman</div>
          <div className="member">Yashu Bommareddy</div>
          <div className="member">Mazin Nadaf</div>
          <div className="member">Brandon Isbell</div>
        </div>
      </div>
      <div className="group-card">
        <h3>AI Research/SWE</h3>
        <p><strong>Mentors:</strong> Akshaj, Aidan</p>
        <div className="members">
          <div className="member">Andy Chen</div>
          <div className="member">Kira Le</div>
          <div className="member">Lily Ureta</div>
          <div className="member">Kyle Yin</div>
          <div className="member">Rachel Li</div>
        </div>
      </div>
      <div className="group-card">
        <h3>SWE</h3>
        <p><strong>Mentors:</strong> Brian, Yanit</p>
        <div className="members">
          <div className="member">Sawyer Bloom</div>
          <div className="member">Lauren Lipinski</div>
          <div className="member">Ryan Selser</div>
          <div className="member">Natali Oleinik</div>
          <div className="member">Jacob Demory</div>
        </div>
      </div>
      <div className="group-card">
        <h3>SWE 2</h3>
        <p><strong>Mentors:</strong> Maura, Michelle</p>
        <div className="members">
          <div className="member">Autumn Anson</div>
          <div className="member">Rukmini Gaddam</div>
          <div className="member">Muatasim Miller</div>
          <div className="member">Nate Zhang</div>
          <div className="member">Ryan Li</div>
        </div>
      </div>
      <div className="group-card">
        <h3>SWE 3</h3>
        <p><strong>Mentors:</strong> Jayden, Ravi</p>
        <div className="members">
          <div className="member">Kaleb Ward</div>
          <div className="member">Andrew Chen</div>
          <div className="member">Bhavya Tanugula</div>
          <div className="member">Nimisokan Ojkutu</div>
          <div className="member">Harleen Green</div>
        </div>
      </div>
      <div className="group-card">
        <h3>SWE/AI Research 2</h3>
        <p><strong>Mentors:</strong> Nitish, Gavin</p>
        <div className="members">
          <div className="member">Aditi Sethi</div>
          <div className="member">Nithya Gopalakrishnan</div>
          <div className="member">Aryan Jain</div>
          <div className="member">Dhruv Satanur</div>
          <div className="member">Rushil Juneja</div>
        </div>
      </div>
      <div className="group-card">
        <h3>PM/Consulting/SWE</h3>
        <p><strong>Mentors:</strong> Samai, Matt</p>
        <div className="members">
          <div className="member">Vir Trivedi</div>
          <div className="member">Riya Laxmi</div>
          <div className="member">Madeline Moldrem</div>
          <div className="member">Samantha Tyles</div>
          <div className="member">James Miller</div>
        </div>
      </div>
    </div>
  </section>
)}


{activeTab === "resources" && (
  <section id="resources" className="card">
    <h2>Office Hours</h2>
    <h3>Evelyn</h3>
    <p>Times: Wednesday 3:10 - 4:10, Thursday 5:00 - 6:00</p>
    <a href="https://us05web.zoom.us/j/3973323282?pwd=bU1uZTVUMHpvMFIzL1EvMFdqTTNadz09" target="_blank" rel="noopener noreferrer">
      Zoom Link
    </a>
    <h3>Kimber</h3>
    <p>Times: Tuesday 1-2, Thursday 1-3</p>
    <a href="https://umd.zoom.us/j/5697396597" target="_blank" rel="noopener noreferrer">
      Zoom Link
    </a>
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