import { useState, useEffect } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import ExpandableBox from "./components/ExpandableBox";
import NavBar from "./components/NavBar";
import NavSearchResult from "./components/NavSearchResult";
import SearchMovieItems from "./components/SearchMovieItems";
import WatchedMovieItems from "./components/WatchedMovieItems";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const query = "456desacf";

  useEffect(() => {
    setIsLoading(true);
    // async function must be called inside
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
        );
        if (!res.ok) {
          throw new Error(
            "Something went wrong when trying to fetch movie data"
          );
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
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
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <SearchMovieItems movies={movies} />}
        </ExpandableBox>
        <ExpandableBox>
          <WatchedMovieSummary watched={watched} />
          <WatchedMovieItems movies={watched} />
        </ExpandableBox>
      </main>
    </>
  );
}
