import Head from "next/head";

export default function BaseHead() {
  return (
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
      <meta property="og:url" content="https://disco-wave.vercel.app/" />
      <meta
        property="og:description"
        content="Disco Wave is making discos just a little bit cooler! With awesome audio visualizations and song suggestions from guests, your next party is going to be even cooler!"
      />
      <meta property="og:image" content="/disco-wave-logo.png" />
    </Head>
  );
}
