import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import ExpandableBox from "./components/ExpandableBox";
import NavBar from "./components/NavBar";
import NavSearchResult from "./components/NavSearchResult";
import SearchMovieItems from "./components/SearchMovieItems";
import WatchedMovieItems from "./components/WatchedMovieItems";
import WatchedMovieSummary from "./components/WatchedMovieSummary";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <NavSearchResult resultNum={movies.length} />
      </NavBar>
      <main className="main">
        <ExpandableBox>
          <SearchMovieItems movies={movies} />
        </ExpandableBox>
        <ExpandableBox>
          <WatchedMovieSummary watched={watched} />
          <WatchedMovieItems movies={watched} />
        </ExpandableBox>
      </main>
    </>
  );
}
