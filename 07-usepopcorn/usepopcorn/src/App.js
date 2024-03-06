import { useState, useEffect } from "react";
// import { tempMovieData, tempWatchedData } from "./data";
import ExpandableBox from "./components/ExpandableBox";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import NavSearchResult from "./components/NavSearchResult";
import SearchMovieItems from "./components/SearchMovieItems";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieItems from "./components/WatchedMovieItems";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function selectMovieHandler(id) {
    setSelectedId((curr) => (curr === id ? null : id));
  }

  function closeMovieHandler() {
    setSelectedId(null);
  }

  useEffect(() => {
    setError("");
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    // async function must be called inside
    const fetchMovies = async () => {
      setIsLoading(true);
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
  }, [query]);

  return (
    <>
      <NavBar>
        <SearchBar query={query} onSetQuery={setQuery} />
        <NavSearchResult resultNum={movies.length} />
      </NavBar>
      <main className="main">
        <ExpandableBox>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <SearchMovieItems
              movies={movies}
              onSelectMovie={selectMovieHandler}
            />
          )}
        </ExpandableBox>
        <ExpandableBox>
          {selectedId ? (
            <MovieDetails movieId={selectedId} onClose={closeMovieHandler} />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieItems movies={watched} />
            </>
          )}
        </ExpandableBox>
      </main>
    </>
  );
}
