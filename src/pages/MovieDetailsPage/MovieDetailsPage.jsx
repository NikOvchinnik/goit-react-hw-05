import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchMovies } from "../../service/api";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import clsx from "clsx";
import style from "./MovieDetailsPage.module.css";
import GoBack from "../../components/GoBack/GoBack";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  const { movieId } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovies(`/3/movie/${movieId}`);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  const imageUrl = movie
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "";

  const linkInformation = ({ isActive }) => {
    return clsx(style.linkInformation, isActive && style.active);
  };

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <main className={style.containerMovieDetails}>
          <GoBack />
          <div className={style.containerMovieInfo}>
            <img
              className={style.movieImg}
              src={imageUrl}
              alt={movie.original_title}
            />
            <div className={style.containerMovieText}>
              <h2>{movie.original_title}</h2>
              <p>User Score: {movie.vote_average.toFixed(1)}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p> {movie.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>
          <div>
            <h2>Additional information</h2>
            <ul className={style.listInformation}>
              <li>
                <NavLink
                  to="cast"
                  state={location.state}
                  className={linkInformation}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
                  state={location.state}
                  className={linkInformation}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </main>
      )}
    </>
  );
};

export default MovieDetailsPage;
