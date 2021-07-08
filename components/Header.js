import { Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";

import s from "../styles/Header.module.css";

function Header() {
  return (
    <Fragment>
      <div className={s.header}>
        <div className={s.header__nav}>
          <button className={s.header__back}>Back</button>
          <IconContext.Provider value={{ className: s.header__searchIcon }}>
            <div className={s.header__search}>
              <FaSearch />
              <input
                type="text"
                // onChange={handleChange}
                placeholder="Search..."
              />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
