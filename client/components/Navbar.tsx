import {
  faArrowRightToBracket,
  faBars,
  faLock,
  faPlus,
  faRightFromBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import s from "styles/N.module.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { isAuth } from "utils/auth";
const Navbar = () => {
  const router = useRouter();
  const auth = isAuth();
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
                <FontAwesomeIcon icon={faPlus} /> Portfolio joylash
              </a>
            </Link>
          </li>
          {!auth && (
            <>
              <li>
                <Link href="/auth/login">
                  <a>
                    <FontAwesomeIcon icon={faLock} /> Kirish
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/auth/register">
                  <a>
                    <FontAwesomeIcon icon={faArrowRightToBracket} /> Ro`yhatdan
                    o`tish
                  </a>
                </Link>
              </li>
            </>
          )}
          {auth && (
            <>
              <li>
                <Link href="/">
                  <a
                    onClick={() => {
                      signOut();
                      localStorage.removeItem("token");
                      router.replace("/");
                    }}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} /> Chiqish
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
            </>
          )}
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
