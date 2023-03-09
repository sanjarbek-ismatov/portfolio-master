import {
  faArrowRightToBracket,
  faBars,
  faLock,
  faPlus,
  faRightFromBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import s from "styles/N.module.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";

import { useAuth } from "utils/auth";
// import { ThemeContext } from "context/themeContext";

const Navbar = () => {
  // const { theme, changeTheme, allThemes } = useContext(ThemeContext);
  const router = useRouter();
  const auth = useAuth();
  const [menu, setMenu] = useState<boolean>();
  const [hydration, setHydration] = useState(false);
  const visibleContent = () => {
    menu ? setMenu(false) : setMenu(true);
  };
  useEffect(() => {
    setHydration(true);
  }, []);
  if (!hydration) return null;
  return (
    <nav id="navbar" className={s.nav}>
      <Link href="/page/1">
        <h1>Portfolio</h1>
      </Link>
      <div className={s.content}>
        <ul
          className={s.menu}
          style={
            menu
              ? {
                  right: "0",
                }
              : {
                  right: "-100%",
                }
          }
        >
          <li>
            <Link href="/create">
              <a>
                <FontAwesomeIcon className="icon" icon={faPlus} /> Portfolio
                joylash
              </a>
            </Link>
          </li>
          {!auth && (
            <>
              <li>
                <Link href="/auth/login">
                  <a>
                    <FontAwesomeIcon className="icon" icon={faLock} /> Kirish
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/auth/register/emailverification">
                  <a>
                    <FontAwesomeIcon
                      className="icon"
                      icon={faArrowRightToBracket}
                    />{" "}
                    Ro`yhatdan o`tish
                  </a>
                </Link>
              </li>
            </>
          )}
          {auth && (
            <>
              <li>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.reload();
                  }}
                >
                  <FontAwesomeIcon className="icon" icon={faRightFromBracket} />{" "}
                  Chiqish
                </a>
              </li>
              <li>
                <Link href="/profile">
                  <a>
                    <FontAwesomeIcon className="icon" icon={faUser} /> Profil
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div
          onClick={visibleContent}
          className={cn({
            [s.iconMenu]: true,
            [s.iconX]: menu,
          })}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
