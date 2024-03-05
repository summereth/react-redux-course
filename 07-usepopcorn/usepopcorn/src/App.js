import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import ExpandableBox from "./components/ExpandableBox";
import NavBar from "./components/NavBar";
import NavSearchResult from "./components/NavSearchResult";
import SearchMovieItems from "./components/SearchMovieItems";
import WatchedMovieItems from "./components/WatchedMovieItems";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import { useEffect } from "react";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const query = "interstellar";

  useEffect(() => {
    // async function must be called inside
    const fetchMovies = async () => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
    };
    fetchMovies();
  }, []);

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
