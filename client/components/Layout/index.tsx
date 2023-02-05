import React, { ReactNode } from "react";
import cn from "classnames";
import { Head } from "components";
import s from "styles/L.module.scss";
import { useContext } from "react";
import { ThemeContext } from "context/themeContext";
const Layout = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={cn({
          [s.rootContainer]: true,
          [s.light]: theme === "light",
          [s.dark]: theme === "dark",
          [s.contrast]: theme === "contrast",
          [s.lightblue]: theme === "lightblue",
        })}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
