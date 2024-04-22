import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchMovies } from "../../service/api";
import MovieList from "../../components/MovieList/MovieList";
import style from "./MoviePage.module.css";
import { useSearchParams } from "react-router-dom";

const notify = () => toast.error("Your form is empty!");
const notifyNoResults = () => toast.error("No movies found with that name.");

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (!queryParam) return;
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovies(`/3/search/movie?query=${queryParam}`);
        if (data.results.length === 0) {
          return notifyNoResults();
        } else {
          return setMovies(data.results);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [searchParams]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const searchValue = form.elements.name.value.trim();
    if (searchValue === "") {
      notify();
      return;
    }
    setSearchParams({ query: searchValue });
    form.reset();
  };

  return (
    <main className={style.moviesContainer}>
      <Toaster />
      <form onSubmit={handleSubmit} className={style.moviesForm}>
        <input
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          className={style.moviesInput}
        />
        <button type="submit" className={style.moviesBtn}>
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </main>
  );
};

export default MoviesPage;
