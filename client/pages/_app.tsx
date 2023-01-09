import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

import { Provider } from "react-redux";
import { store } from "state/store";
import { Session } from "next-auth";
import Aos from "aos";
import "aos/dist/aos.css";

import "styles/globals.scss";
import Head from "next/head";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & { pageProps: { session: Session } }) {
  useEffect(() => {
    Aos.init();
    if (process.env.NODE_ENV === "production") {
      console.log = (...val) => {};
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
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
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
