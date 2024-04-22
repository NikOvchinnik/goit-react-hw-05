import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchMovies } from "../../service/api";
import { useParams } from "react-router-dom";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovies(`/3/movie/${movieId}/credits`);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <ul className={style.listMovieCast}>
          {movie.cast.length > 0 ? (
            movie.cast.map((movieCast) => {
              const imageUrl = movieCast.profile_path
                ? `https://image.tmdb.org/t/p/w200${movieCast.profile_path}`
                : "https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png";
              return (
                <li key={movieCast.id} className={style.itemMovieCast}>
                  <img src={imageUrl} alt={movieCast.name} />
                  <h3>{movieCast.name}</h3>
                  <p>{movieCast.character}</p>
                </li>
              );
            })
          ) : (
            <p>We dont have cast for this movie</p>
          )}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
