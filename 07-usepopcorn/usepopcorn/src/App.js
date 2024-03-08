import { useState } from "react";
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
import { useMovie } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // set state using localStorage
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // fetch data based on query
  // const { movies, isLoading, error } = useMovie(query, closeMovieHandler);
  const { movies, isLoading, error } = useMovie(query);

  function selectMovieHandler(id) {
    setSelectedId((curr) => (curr === id ? null : id));
  }

  function closeMovieHandler() {
    setSelectedId(null);
  }

  function addWatchedHandler(movie) {
    setWatched((curr) =>
      curr.find((element) => element.imdbID === movie.imdbID)
        ? curr.map((element) =>
            element.imdbID === movie.imdbID ? movie : element
          )
        : [...curr, movie]
    );
    /* Save to local storage in event handler */
    // setWatched((curr) => {
    //   const modifiedWatched = curr.find(
    //     (element) => element.imdbID === movie.imdbID
    //   )
    //     ? curr.map((element) =>
    //         element.imdbID === movie.imdbID ? movie : element
    //       )
    //     : [...curr, movie];

    //   localStorage.setItem("watched", JSON.stringify(modifiedWatched));
    //   return modifiedWatched;
    // });
  }

  function removeWatchedHandler(id) {
    setWatched((curr) => curr.filter((movie) => movie.imdbID !== id));
  }

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
            <MovieDetails
              movieId={selectedId}
              onClose={closeMovieHandler}
              onAddWatched={addWatchedHandler}
              ratingByUser={
                watched.find((element) => element.imdbID === selectedId)
                  ?.userRating
              }
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieItems
                movies={watched}
                onRemove={removeWatchedHandler}
              />
            </>
          )}
        </ExpandableBox>
      </main>
    </>
  );
}
