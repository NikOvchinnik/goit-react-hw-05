import style from "./GoBack.module.css";
import { Link, useLocation } from "react-router-dom";

const GoBack = () => {
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";
  return (
    <Link to={backLinkHref} className={style.btnGoBack}>
      Go Back
    </Link>
  );
};

export default GoBack;
