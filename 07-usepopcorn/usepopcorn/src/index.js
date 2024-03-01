import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} color="red" />
    <StarRating maxRating={5} size={24} />
    <StarRating
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
  </React.StrictMode>
);
