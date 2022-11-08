import "tailwindcss/tailwind.css";
import "../pages/styles/style.scss";
import Head from "next/head";
import { AppProps } from "next/app";
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Typing test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
