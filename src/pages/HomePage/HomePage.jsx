import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchMovies } from "../../service/api";
import style from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovies(`/3/trending/movie/day`);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <main className={style.mainContainer}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <>
          <h1>Trending today</h1>
          <MovieList movies={movies} />
        </>
      )}
    </main>
  );
};

export default HomePage;
