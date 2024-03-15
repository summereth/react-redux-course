import React from "react";

function Question({ questions, index, answer, onAnswer, clickNext }) {
  const hasAnswer = answer !== null;
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              hasAnswer && i === question.correctOption
                ? "correct"
                : hasAnswer
                ? "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => onAnswer(i)}
          >
            {option}
          </button>
        ))}
      </div>
      {hasAnswer && (
        <button className="btn btn-ui" onClick={clickNext}>
          {index < questions.length - 1 ? "Next" : "Submit"}
        </button>
      )}
    </div>
  );
}

export default Question;
