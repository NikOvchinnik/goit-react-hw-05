import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchMovies } from "../../service/api";
import { useParams } from "react-router-dom";
import style from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovies(`/3/movie/${movieId}/reviews`);
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
        <ul className={style.listMovieReviews}>
          {movie.results.length > 0 ? (
            movie.results.map((review) => {
              return (
                <li key={review.id}>
                  <h3>{review.author}</h3>
                  <p>{review.content}</p>
                </li>
              );
            })
          ) : (
            <p>We dont have any reviews for this movie</p>
          )}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
