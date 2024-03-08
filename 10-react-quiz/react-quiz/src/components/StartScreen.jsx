import React from "react";

function StartScreen({ questionNum }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionNum} questions to test your React mastery!</h3>
      <button className="btn btn-ui">Let's start!</button>
    </div>
  );
}

export default StartScreen;
