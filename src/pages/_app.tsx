import { Provider } from "next-auth/client";
import "../styles/globals.css";
import BaseHead from "../components/BaseHead";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <BaseHead />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
