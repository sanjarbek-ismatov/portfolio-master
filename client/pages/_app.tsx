import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { userType } from "types/session";
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
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
