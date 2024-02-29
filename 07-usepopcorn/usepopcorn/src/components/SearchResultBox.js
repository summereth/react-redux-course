import { useState } from "react";
import { tempMovieData } from "../data";
import ExpandButton from "./ExpandButton";
import SearchMovieItem from "./SearchMovieItem";

export default function SearchResultBox() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ExpandButton isOpen={isOpen} onClickButton={setIsOpen} />
      {isOpen && (
        <ul className="list">
          {movies?.map((movie) => (
            <SearchMovieItem movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      )}
    </div>
  );
}
