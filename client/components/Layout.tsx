import Head from "next/head";
import React, { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
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
      {children}
    </>
  );
};

export default Layout;
