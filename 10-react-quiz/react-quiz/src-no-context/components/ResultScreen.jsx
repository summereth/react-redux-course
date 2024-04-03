import React from "react";

function ResultScreen({ points, maxPossiblePoints, highscore, clickRestart }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={clickRestart}>
        Restart quiz
      </button>
    </>
  );
}

export default ResultScreen;
