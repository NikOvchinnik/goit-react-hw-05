import { NavLink } from "react-router-dom";
import { BiSolidVideoRecording } from "react-icons/bi";
import clsx from "clsx";
import style from "./Navigation.module.css"

const Navigation = () => {
    const headerLink = ({ isActive }) => {
      return clsx(style.headerLink, isActive && style.active);
  };
  
    return (
      <header className={style.headerContainer}>
        <div className={style.headerIconContainer}>
          <BiSolidVideoRecording className={style.headerIcon} />
          <h2>GoMovie</h2>
        </div>
        <nav className={style.headerNavigation}>
          <NavLink to="/" className={headerLink}>
            Home
          </NavLink>
          <NavLink to="/movies" className={headerLink}>
            Movies
          </NavLink>
        </nav>
      </header>
    );
}

export default Navigation;