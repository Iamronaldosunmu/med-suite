import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}
