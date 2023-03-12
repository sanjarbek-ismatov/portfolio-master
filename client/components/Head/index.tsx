import Head from "next/head";
import React from "react";
import type { HeadProps } from "types";

const Index = ({ title, description, image, keywords }: HeadProps) => {
  return (
    <Head>
      <title>{title || "Portfolio Master"}</title>
      <meta name="title" content={title || "Portfolio Master"} />
      <meta
        name="description"
        content={
          description ||
          "Portfolio master - dasturchilarning loyihalari uchun community"
        }
      />
      <meta property="og:title" content={title || "Portfolio Master"} />
      <meta
        property="og:description"
        content={
          description ||
          "Portfolio master - dasturchilarning loyihalari uchun community"
        }
      />
      <meta
        property="og:image"
        content={
          image ||
          "https://assets-global.website-files.com/5e39e095596498a8b9624af1/6193022cdf422e5241274126_Portfolio%20course.jpg"
        }
      />
      <meta
        name="keywords"
        content={
          keywords
            ? "Portfolio master, Portfolio master uz, Portfolio, Uz, Master, " +
              keywords
            : "Portfolio master, Portfolio master uz, Portfolio, Uz, Master"
        }
      />
      <link rel="shortcut icon" href="https://i.ibb.co/M6cGSt0/icon.png" />
      <script async src="/js/google-tag.js" />
    </Head>
  );
};

export default Index;
