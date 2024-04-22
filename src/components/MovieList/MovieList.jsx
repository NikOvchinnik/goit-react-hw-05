import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={style.moveList}>
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : "https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png";
        return (
          <li key={movie.id} className={style.moveItem}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <div className={style.moveContainer}>
                <img
                  src={imageUrl}
                  alt={movie.original_title}
                  className={style.moveImg}
                />
                <h3 className={style.moveTitle}>{movie.original_title}</h3>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
