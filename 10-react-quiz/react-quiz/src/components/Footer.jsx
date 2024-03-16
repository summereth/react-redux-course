import React from "react";
import { useEffect } from "react";

function Footer({
  answer,
  index,
  questionNum,
  clickNext,
  secondsRemaining,
  onTick,
}) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining - mins * 60;

  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(id);
  }, [onTick]);

  return (
    <footer>
      <div className="timer">
        {mins < 10 ? `0${mins}` : mins}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      {answer !== null && (
        <button className="btn btn-ui" onClick={clickNext}>
          {index < questionNum - 1 ? "Next" : "Submit"}
        </button>
      )}
    </footer>
  );
}

export default Footer;
