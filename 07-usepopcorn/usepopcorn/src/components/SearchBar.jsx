import { useEffect, useRef } from "react";

export default function SearchBar({ query, onSetQuery }) {
  const inputEl = useRef(null);

  // DOM manipulation: delete contents and focus on search bar
  // when "Enter" hit && search bar is not selected
  useEffect(() => {
    function callback(e) {
      if (document.activeElement !== inputEl.current && e.code === "Enter") {
        onSetQuery("");
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [onSetQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
