import { Link } from "react-router-dom";
import style from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={style.containerNotFoundPage}>
      <h2>Oops, this page is not found</h2>
      <Link to="/" className={style.btnNotFoundPage}>
        Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
