import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  
  const slideShows = [
    { title: "Lecture 1", link: "https://docs.google.com/presentation/d/1VP9mrEZJZ9ALk2dBwadcGkWBg5twjUbM6VFZ7Fn3Vkk/edit?usp=sharing" },
    { title: "Lecture 2", link: "https://docs.google.com/presentation/d/1wO047LhrT73QIcC5WzFhzGOtYhxap3aPq-nYbjmOSKk/edit?usp=sharing" },
    { title: "Lecture 3", link: "https://docs.google.com/presentation/d/1RWvO8TQ_ueJyBdSHfZ6oNvq9E6J3rYovItbX_Q-r-44/edit?usp=sharing" },
    { title: "Lecture 4", link: "https://docs.google.com/presentation/d/14ooPTPyM4QZPWMBq2sg4NypMQZAHQ4rY5n6CUn6l7zI/edit?usp=sharing" },
    { title: "Lecture 5", link: "https://docs.google.com/presentation/d/1YzEswdGs5zqZMaK8zPCaJl8PiiFFOYDnz2QVHLDAxak/edit?usp=sharing" },
    { title: "Lecture 6", link: "https://docs.google.com/presentation/d/1GTiIFoT1EDLZ0Y9SC6G1f9c1-YZoMM-NMLOC8-0_-lI/edit?usp=sharing" },
  ];

  const [currentSlideShow, setCurrentSlideShow] = useState(0)
  
  const nextSlide = () => {
    setCurrentSlideShow((currentSlideShow+1) % slideShows.length)
  };

  const prevSlide = () => {
    setCurrentSlideShow((currentSlideShow - 1 + slideShows.length) % slideShows.length)
  };

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
        <section id = "lecture-slides"> 
          <h2> Lecture Slides </h2>
         <div className = "lecture-buttons">
          {slideShows.map((slideShow, index) => (
            <button
            key={index}
            onClick={() => setCurrentSlideShow(index)} 
          >
            {slideShow.title}
          </button>

          ))}

         </div>
         <iframe
          src={`https://docs.google.com/presentation/d/${slideShows[currentSlideShow].link.split('/d/')[1].split('/')[0]}/embed`}
          width="960"
          height="569"
          style={{ border: "none" }}  
          allowFullScreen={true} 
          ></iframe>


        </section>
      
      </main>
    </div>
  );
};

export default App;
