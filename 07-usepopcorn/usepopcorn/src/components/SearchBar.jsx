import { useRef } from "react";
import { useKey } from "../useKey";

export default function SearchBar({ query, onSetQuery }) {
  const inputEl = useRef(null);

  // DOM manipulation: delete contents and focus on search bar
  // when "Enter" hit && search bar is not selected
  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    onSetQuery("");
    inputEl.current.focus();
  });

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
