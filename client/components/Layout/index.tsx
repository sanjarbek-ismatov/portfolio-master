import React, { ReactNode } from "react";
import styles from "styles/L.module.scss";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={styles.rootContainer}>{children}</div>
    </>
  );
};

export default Layout;
