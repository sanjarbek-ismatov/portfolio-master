import {
  faBars,
  faCircleInfo,
  faLock,
  faLockOpen,
  faPlus,
  faRightFromBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import cn from "classnames";
import s from "styles/N.module.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Navbar = () => {
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.token;
    }
  };
  const { data, status } = useSession();
  const router = useRouter();
  const token = getToken();
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
          {!data && !token && (
            <li>
              <Link href="/auth/login">
                <a>
                  <FontAwesomeIcon icon={faLock} /> Kirish
                </a>
              </Link>
            </li>
          )}
          {(data || token) && (
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
