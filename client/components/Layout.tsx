import Head from "next/head";
import React, { ReactNode } from "react";
import cn from "classnames";
import s from "styles/L.module.scss";
import { useContext } from "react";
import { ThemeContext } from "context/themeContext";
const Layout = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Head>
        <title>Portfolio master</title>
        <meta name="title" content="Portfolio master" />
        <meta
          name="description"
          content="Portfolio master - dasturchilarning loyihalari uchun community"
        />
        <meta property="og:title" content="Portfolio Master" />
        <meta
          property="og:description"
          content="Portfolio master - dasturchilarning loyihalari uchun community"
        />
        <meta
          property="og:image"
          content="https://assets-global.website-files.com/5e39e095596498a8b9624af1/6193022cdf422e5241274126_Portfolio%20course.jpg"
        />
        <link rel="shortcut icon" href="https://i.ibb.co/M6cGSt0/icon.png" />
      </Head>
      <div
        className={cn({
          [s.light]: theme === "light",
          [s.dark]: theme === "dark",
        })}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
