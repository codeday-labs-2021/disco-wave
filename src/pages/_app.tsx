import { Provider } from "next-auth/client";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link rel="shortcut icon" href="/disco-wave-logo.png" />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Disco Wave is making discos just a little bit cooler! With awesome audio visualizations and song suggestions from guests, your next party is going to be even cooler!"
        />
        <meta property="og:title" content="Disco Wave" />
        <meta
          name="keywords"
          content="audio, audio visualization, disco, wave, audio wave, suggestions, disco wave"
        />

        <meta
          property="og:description"
          content="Disco Wave is making discos just a little bit cooler! With awesome audio visualizations and song suggestions from guests, your next party is going to be even cooler!"
        />
        <meta property="og:image" content="/disco-wave-logo.png" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
