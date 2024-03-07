import React from "react";
import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import StarRating from "./StarRating";

const MovieDetails = ({ movieId, onClose, onAddWatched, ratingByUser }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(ratingByUser);

  const {
    Title: title,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Plot: plot,
    Actors: actors,
    Poster: poster,
    imdbRating,
  } = movie;

  const addWatchedHandler = () => {
    onAddWatched({
      imdbID: movieId,
      poster,
      title,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    });
    onClose();
  };

  useEffect(() => {
    setError("");

    const fetchMovieById = async (id) => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${movieId}`
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

        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieById(movieId);
    }
  }, [movieId]);

  useEffect(() => {
    if (title) {
      document.title = `Movie | ${title}`;
    }

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      <button className="btn-back" onClick={onClose}>
        &larr;
      </button>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>{`⭐️ ${imdbRating} iMDb Rating`}</p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
                defaultRating={userRating}
              />
              {userRating && (
                <button className="btn-add" onClick={addWatchedHandler}>
                  + Add to list
                </button>
              )}
            </div>
            <p>{plot}</p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
