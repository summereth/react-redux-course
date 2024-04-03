import React from "react";
import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Footer() {
  const { answer, index, questionNum, secondsRemaining, dispatch } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining - mins * 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <footer>
      <div className="timer">
        {mins < 10 ? `0${mins}` : mins}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      {answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          {index < questionNum - 1 ? "Next" : "Submit"}
        </button>
      )}
    </footer>
  );
}

export default Footer;
