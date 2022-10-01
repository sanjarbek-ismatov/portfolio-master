import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import cn from "classnames";
import s from "styles/N.module.scss";
const Navbar = () => {
  const [menu, setMenu] = useState<boolean>();
  const visibleContent = () => {
    menu ? setMenu(false) : setMenu(true);
  };
  return (
    <nav className={s.nav}>
      <h1>Portfolio</h1>
      <div className={s.content}>
        <ul
          className={s.menu}
          style={
            menu
              ? {
                  right: "0",
                }
              : {
                  right: "-300px",
                }
          }
        >
          <li>
            <Link href="/create">
              <a>Portfolio joylash</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>Loyiha haqida</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>Profil</a>
            </Link>
          </li>
        </ul>
        <FontAwesomeIcon
          onClick={visibleContent}
          className={s.icon}
          icon={menu ? faX : faBars}
        />
      </div>
    </nav>
  );
};

export default Navbar;
