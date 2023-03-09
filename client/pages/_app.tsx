import "styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "state/store";

import { Head, Layout } from "components";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Head />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
