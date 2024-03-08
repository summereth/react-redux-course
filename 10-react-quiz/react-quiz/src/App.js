import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  // status: loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataDownloaded":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown action in reducer");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch data and update state with dispatch
  useEffect(() => {
    fetch("http://localhost:3030/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataDownloaded", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div>
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions?</p>
      </Main>
    </div>
  );
}

export default App;
