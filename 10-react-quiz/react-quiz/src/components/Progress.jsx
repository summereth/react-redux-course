import React from "react";

function Progress({ index, questionNum, points, maxPossiblePoints, answer }) {
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
