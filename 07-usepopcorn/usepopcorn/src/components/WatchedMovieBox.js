import { useState } from "react";
import { tempWatchedData } from "../data";
import ExpandButton from "./ExpandButton";
import WatchedMovieItem from "./WatchedMovieItem";
import WatchedMovieSummary from "./WatchedMovieSummary";

export default function WatchedMovieBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ExpandButton isOpen={isOpen} onClickButton={setIsOpen} />
      {isOpen && (
        <>
          <WatchedMovieSummary watched={watched} />
          <ul className="list">
            {watched.map((movie) => (
              <WatchedMovieItem movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
