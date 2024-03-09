import React from "react";

function Question({ question, clickNext }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option) => (
          <button className="btn btn-option" key={option}>
            {option}
          </button>
        ))}
      </div>
      <button className="btn btn-ui" onClick={clickNext}>
        Next
      </button>
    </div>
  );
}

export default Question;
