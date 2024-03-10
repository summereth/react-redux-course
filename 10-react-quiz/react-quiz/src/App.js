import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  // status: loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null, // user's answer to current question (questions[index])
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataDownloaded":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          state.points +
          (action.payload === question.correctOption ? question.points : 0),
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error("Unknown action in reducer");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer } = state;

  // fetch data and update state with dispatch
  useEffect(() => {
    fetch("http://localhost:3030/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataDownloaded", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questionNum={questions.length}
            clickStart={() => dispatch({ type: "start" })}
          />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            answer={answer}
            onAnswer={(answer) =>
              dispatch({ type: "newAnswer", payload: answer })
            }
            clickNext={() => dispatch({ type: "nextQuestion" })}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
