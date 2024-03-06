import React from "react";
import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="detail">
      <button className="btn-back" onClick={onClose}>
        &larr;
      </button>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && movie && <p>{movie.Title}</p>}
    </div>
  );
};

export default MovieDetails;
