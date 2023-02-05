import React from "react";
import styles from "./NavbarProfile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const NavbarProfile = () => {
  return (
    <nav className={styles.nav}>
      <FontAwesomeIcon className={styles.backIcon} icon={faArrowLeft} />
    </nav>
  );
};

export default NavbarProfile;
