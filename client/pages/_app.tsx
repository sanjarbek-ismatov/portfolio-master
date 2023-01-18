import "styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

import { Provider } from "react-redux";
import { store } from "state/store";
import { Session } from "next-auth";
import Aos from "aos";
import "aos/dist/aos.css";
import Layout from "components/Layout";
// import { ThemeContext } from "context/themeContext";
// import { useTheme } from "hooks/useTheme";
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
  // const [theme, changeTheme, allThemes] = useTheme();
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {/* <ThemeContext.Provider value={{ theme, changeTheme, allThemes }}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </ThemeContext.Provider> */}
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
