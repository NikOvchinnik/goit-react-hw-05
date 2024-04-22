import { NavLink } from "react-router-dom";
import { BiSolidVideoRecording } from "react-icons/bi";
import style from "./Navigation.module.css"

const Navigation = () => {
    return (
      <header className={style.headerContainer}>
        <div className={style.headerIconContainer}>
          <BiSolidVideoRecording className={style.headerIcon} />
          <h2>GoMovie</h2>
        </div>
        <nav className={style.headerNavigation}>
          <NavLink to="/" className={style.headerLink}>
            Home
          </NavLink>
          <NavLink to="/movies" className={style.headerLink}>
            Movies
          </NavLink>
        </nav>
      </header>
    );
}

export default Navigation;