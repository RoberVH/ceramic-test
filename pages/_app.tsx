import "../styles/globals.css";
import type { AppProps } from "next/app";
import ProfileProvider from "../app/context/profile";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProfileProvider>
      <Component {...pageProps} />
    </ProfileProvider>
  );
}

export default MyApp;
