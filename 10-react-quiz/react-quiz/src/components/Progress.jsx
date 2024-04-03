import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, questionNum, maxPossiblePoints, points, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={questionNum} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionNum}
      </p>

      <p>
        {points} / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
