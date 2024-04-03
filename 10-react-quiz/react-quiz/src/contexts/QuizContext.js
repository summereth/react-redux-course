import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],
  // status: loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null, // user's answer to current question (questions[index])
  points: 0,
  highscore: JSON.parse(localStorage.getItem("highscore")) || 0,
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
        // finish the quiz
        localStorage.setItem(
          "highscore",
          state.highscore < state.points ? state.points : state.highscore
        );
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

function QuizProvider({ children }) {
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
  const questionNum = questions.length;
  const maxPossiblePoints = questions.reduce((acc, q) => acc + q.points, 0);

  // fetch data and update state with dispatch
  useEffect(() => {
    fetch("http://localhost:3030/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataDownloaded", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        questionNum,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside of QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
