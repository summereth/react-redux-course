import { useState, useEffect } from "react";

export function useMovie(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    //closeMovieHandler();
    // callback?.();
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    const controller = new AbortController();
    // async function must be called inside
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
          { signal: controller.signal }
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
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
