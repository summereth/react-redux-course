import React from "react";
import { useState } from "react";

const App = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];

  const nextHandler = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      //   setStep(step + 1);
    }
  };

  const prevHandler = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      //   setStep(step - 1);
    }
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((curr) => !curr)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={prevHandler}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={nextHandler}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
