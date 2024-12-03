import React, { useState, useEffect } from "react";
import "./Homework.css";

import flashcardImage from "./flashcard.png";
import matchingImage from "./matching.png";
import twitterImage from "./twitter.png";

const Homework: React.FC = () => {
  const [homeworkData, setHomeworkData] = useState([
    {
      week: 1,
      title: "Homework 1- Git",
      dueDate: "2024-11-2",
      instructions: "Complete the git levels on the Google Form.",
      link: "https://forms.gle/MQejHVuzuVzj3uGE7",
      submitted: false
    },
    {
      week: 2,
      title: "Homework 2- More Git and Flexbox",
      dueDate: "2024-11-9",
      instructions: "1) Create a new branch titled “flexbox” and incorporate Flexbox into your project 2) Upload a screenshot of Levels 1-6 of “Push & Pull – Git Remotes!” into your new flexbox branch 3) Upload a screenshot of you completing levels 1-13 and 18-20 of Flexbox Froggy into your new flexbox branch",
      link: "https://forms.gle/6XVNWAyVc5ADfZxz9",
      submitted: false
    },
    {
      week: 3,
      title: "Homework 3- Flashcard App",
      dueDate: "2024-11-16",
      instructions: "Create a flashcard app! When you click the card, it should show the definition. You can also go to the next card or previous card. If you keep pressing next, it should loop back to the first card and vice-versa. Also, you need to create the ability to add more cards if needed. To get the files go here: https://github.com/KiberVG/bootcamp2024-flashcardhw Please do not clone the repository. Instead, copy and paste the code into your own code editor or download a zip and get the files that way. When you’re done, make sure to create your own repository for the files",
      link: "https://forms.gle/fhbZwTntgESBEY6j8",
      submitted: false,
      image: flashcardImage
    },
    {
      week: 4,
      title: "Homework 4- Matching Cards",
      dueDate: "2024-11-23",
      instructions: "Read through https://react.dev/learn/your-first-component https://react.dev/learn/passing-props-to-a-component and https://react.dev/learn/conditional-rendering and then complete the challenges for ‘Your first component’ and ‘Conditional Rendering’ and then take screenshots upon completion. Our second set of homework this week is another JavaScript game: https://github.com/KiberVG/MemoryMatchingBootcampHW It should look like the attached photo when you’re all done.",
      link: "https://forms.gle/2bRc93qwD8nwJafu5",
      submitted: false,
      image: matchingImage
    },
    {
      week: 5,
      title: "Homework 5- React and Twitter Clone",
      dueDate: "2024-12-8",
      instructions: "You do not need to add the functionality to create new tweets or comments, you simply need to display the tweets on the screen and have the ability to like and unlike the tweets. https://github.com/KiberVG/bootcampfall2024-twitterclone Reading assignments: https://react.dev/learn/rendering-lists (no challenges), https://react.dev/learn/state-a-components-memory (complete challenges), https://react.dev/learn/render-and-commit (no challenges), https://react.dev/learn/updating-objects-in-state (no challenges). It’s important that the reading gets done before Tuesday’s lecture even if you can’t submit the form yet.",
      link: "https://forms.gle/65u4Er1kCaEMJioa7",
      submitted: false,
      image: twitterImage
    }
  ]);

  useEffect(() => {
    const savedData = localStorage.getItem("homeworkData");
    if (savedData) {
      setHomeworkData(JSON.parse(savedData));
    }
  }, []);

  const markAsCompleted = (homework: any) => {
    const newHomeworkData = homeworkData.map((hw) => {
      if (hw === homework) {
        return { ...hw, submitted: true };
      }
      return hw;
    });

    setHomeworkData(newHomeworkData);
    localStorage.setItem("homeworkData", JSON.stringify(newHomeworkData));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAssignment = homeworkData
    .filter(hw => new Date(hw.dueDate) >= today && !hw.submitted)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  const overdueAssignments = homeworkData.filter(
    hw => new Date(hw.dueDate) < today && !hw.submitted
  );

  const formatInstructions = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  const formatDate = (dateString: string) => {
    const dateParts = dateString.split('-');
    const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    const month = date.getMonth() + 1; 
    const day = date.getDate(); 
    return `${month}/${day}`; 
  };

  return (
    <section id="homework">
      <h2>HW Assignments</h2>
      <div>
        <h3>Upcoming Assignment</h3>
        {upcomingAssignment ? (
          <div className="homework-item">
            <h3>{upcomingAssignment.title}</h3>
            {upcomingAssignment.image && (
              <img
                src={upcomingAssignment.image}
                alt={`${upcomingAssignment.title} Image`}
                className="homework-image"
              />
            )}
            <p><strong>Due Date:</strong> {formatDate(upcomingAssignment.dueDate)}</p>
            <p><strong>Instructions:</strong> {formatInstructions(upcomingAssignment.instructions)}</p>
            {upcomingAssignment.link && (
              <a href={upcomingAssignment.link} target="_blank" rel="noopener noreferrer">Submit Here</a>
            )}
            <button onClick={() => markAsCompleted(upcomingAssignment)}>Mark as Completed</button>
          </div>
        ) : (
          <p>No upcoming assignments.</p>
        )}
      </div>

      <div>
        <h3>Overdue Assignments</h3>
        {overdueAssignments.length > 0 ? (
          overdueAssignments.map((homework) => (
            <div key={homework.week} className="homework-item">
              <h3>{homework.title}</h3>
              {homework.image && (
                <img
                  src={homework.image}
                  alt={`${homework.title} Image`}
                  className="homework-image"
                />
              )}
              <p><strong>Due Date:</strong> {formatDate(homework.dueDate)}</p>
              <p><strong>Instructions:</strong> {formatInstructions(homework.instructions)}</p>
              {homework.link && (
                <a href={homework.link} target="_blank" rel="noopener noreferrer">Submit Here</a>
              )}
              <button onClick={() => markAsCompleted(homework)}>Mark as Completed</button>
            </div>
          ))
        ) : (
          <p>No overdue assignments.</p>
        )}
      </div>
    </section>
  );
};

export default Homework;