import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import { useEffect, useReducer } from "react";
import Progress from "./components/Progress";
import ResultScreen from "./components/ResultScreen";
import Footer from "./components/Footer";

const initialState = {
  questions: [],
  // status: loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null, // user's answer to current question (questions[index])
  points: 0,
  highscore: 0,
  secondsRemaining: 450,
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
      if (state.index === state.questions.length - 1) {
        return {
          ...state,
          status: "finished",
          highscore:
            state.highscore < state.points ? state.points : state.highscore,
        };
      }
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "restart":
      return {
        ...initialState,
        status: "active",
        highscore: state.highscore,
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        // end the quiz if time out
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action in reducer");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    status,
    questions,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  // fetch data and update state with dispatch
  useEffect(() => {
    fetch("http://localhost:3030/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataDownloaded", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const questionNum = questions.length;
  const maxPossiblePoints = questions.reduce((acc, q) => acc + q.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questionNum={questionNum}
            clickStart={() => dispatch({ type: "start" })}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              questionNum={questionNum}
              points={points}
              index={index}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              questions={questions}
              index={index}
              answer={answer}
              onAnswer={(answer) =>
                dispatch({ type: "newAnswer", payload: answer })
              }
            />
            <Footer
              answer={answer}
              index={index}
              questionNum={questionNum}
              secondsRemaining={secondsRemaining}
              onTick={() => dispatch({ type: "tick" })}
              clickNext={() => dispatch({ type: "nextQuestion" })}
            />
          </>
        )}
        {status === "finished" && (
          <ResultScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            clickRestart={() => dispatch({ type: "restart" })}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
