import React from "react";
import styles from "./NavbarProfile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const NavbarProfile = () => {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      <FontAwesomeIcon
        onClick={() => router.back()}
        className={styles.backIcon}
        cursor="pointer"
        icon={faArrowLeft}
      />
    </nav>
  );
};

export default NavbarProfile;
