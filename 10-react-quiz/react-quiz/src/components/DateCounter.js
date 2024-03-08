import { useReducer } from "react";

const initialState = { step: 1, count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "incCount":
      return { ...state, count: state.count + state.step };
    case "decCount":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payLoad };
    case "setStep":
      return { ...state, step: action.payLoad };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action in reducer");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, count } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decCount" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: "incCount" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payLoad: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payLoad: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
