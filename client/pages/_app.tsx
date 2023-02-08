import "styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "state/store";
import { Session } from "next-auth";
import { tokenValidator } from "utils/auth";
import Aos from "aos";
import "aos/dist/aos.css";
import { Head, Layout } from "components";
import { getToken } from "utils/getDetails";
import { useRouter } from "next/router";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & { pageProps: { session: Session } }) {
  const router = useRouter();
  useEffect(() => {
    Aos.init();
    if (process.env.NODE_ENV === "production") {
      console.log = (...val) => {};
    }

    tokenValidator(getToken()).then((data) => {
      if (!data) {
        localStorage.clear();
        router.replace("/auth/login");
      }
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Head />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
