import React from "react";
import styles from "./Button.module.css";

function Button({ children, type, onClick, disabled = false }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
