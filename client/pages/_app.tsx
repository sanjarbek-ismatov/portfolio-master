import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { userType } from "types/session";
import { Provider } from "react-redux";
import { store } from "state/store";
function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<userType>();
  async function getSessions() {
    await getSession().then((data: any) => setSession(data));
  }
  useEffect(() => {
    getSessions();
  }, []);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
