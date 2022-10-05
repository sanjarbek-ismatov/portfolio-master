import {
  faBars,
  faCircleInfo,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import cn from "classnames";
import s from "styles/N.module.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";
const Navbar = () => {
  const [menu, setMenu] = useState<boolean>();
  const visibleContent = () => {
    menu ? setMenu(false) : setMenu(true);
  };
  return (
    <nav id="navbar" className={s.nav}>
      <h1>Portfolio</h1>
      <div className={s.content}>
        <ul
          className={s.menu}
          style={
            menu
              ? {
                  // transform: "translateX(0)",
                  right: "0",
                }
              : {
                  // transform: "translateX(300px)",
                  right: "-300px",
                }
          }
        >
          <li>
            <Link href="/create">
              <a>
                <FontAwesomeIcon icon={faPlus} /> Portfolio joylash
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>
                <FontAwesomeIcon icon={faCircleInfo} /> Loyiha haqida
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <FontAwesomeIcon icon={faUser} /> Profil
              </a>
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
