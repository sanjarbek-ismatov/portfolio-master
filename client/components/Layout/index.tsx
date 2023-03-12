import React, { ReactNode } from "react";
import styles from "styles/L.module.scss";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={styles.rootContainer}>{children}</div>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-58QQT8B"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </>
  );
};

export default Layout;
