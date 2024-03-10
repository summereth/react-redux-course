import React from "react";

function Question({ question, answer, onAnswer, clickNext }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              answer !== null && i === question.correctOption
                ? "correct"
                : answer
                ? "wrong"
                : ""
            }`}
            key={option}
            disabled={answer !== null}
            onClick={() => onAnswer(i)}
          >
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
