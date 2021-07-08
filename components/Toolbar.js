import s from "../styles/Toolbar.module.css";
import { signOut, useSession } from "next-auth/client";
import { IconContext } from "react-icons";
import { FaAmazon } from "react-icons/fa";
import {
  HiBookmark,
  HiHome,
  HiLogin,
  HiLogout,
  HiShoppingCart,
} from "react-icons/hi";
import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Image } from "next/image";
import { Router } from "next/router";
import defaultImage from "../public/default.jpg";

function Toolbar() {
  const [session, loading] = useSession();
  const [active, setActive] = useState(false);
  const router = useRouter(false);

  return (
    <Fragment>
      <div className={`${s.sidebar} ${active ? s.active : ""}`}>
        <FaAmazon
          size="3rem"
          className={s.sidebar__icon}
          color="#FF9900"
          onClick={() => setActive(!active)}
        />
        <IconContext.Provider value={{ className: s.sidebar__menuIcon }}>
          <ul className={s.sidebar__menuItem}>
            <li onClick={() => router.push("/")}>
              <HiHome className="active" size="2rem" />
            </li>
            <li>
              <HiShoppingCart size="2rem" />
            </li>
            <li>
              <HiBookmark size="2rem" />
            </li>
          </ul>
          {session ? (
            <a onClick={() => signOut()}>
              <HiLogout size="2rem" />
            </a>
          ) : (
            <a onClick={() => router.push("/Signin")}>
              <HiLogin size="2rem" />
            </a>
          )}
        </IconContext.Provider>
        {/* {session.user ? (
          <Image
            src={session.user?.photoURL || defaultImage}
            onClick={() => {
              Router.push("/profile");
            }}
            data-tip="My Account"
            data-for="sidebarTooltip"
            className="sidebar__avatar"
            alt="User Pic"
          />
        ) : (
          <Link
            to="/login"
            className="sidebar__menuItem"
            activeClassName="active"
            data-tip="Login / Register"
            data-for="sidebarTooltip"
            onClick={toggleSidebar}
          >
            <div className="sidebar__menuIcon" />
          </Link>
        )} */}
      </div>
    </Fragment>
  );
}

export default Toolbar;
