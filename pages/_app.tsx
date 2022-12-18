import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

import Router from "next/router";
import { CookiesProvider } from "react-cookie";
import UserContextProvider from "../components/Context/UserContext";
import ContactDetailsContextProvider from "../components/Context/ContactDetailsContext";
import ContactDetails from "./application_form/contact_details";

const routeChange = () => {
  // Temporary fix to avoid flash of unstyled content
  // during route transitions. Keep an eye on this
  // issue and remove this code when resolved:
  // https://github.com/vercel/next.js/issues/17464

  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach((elem) => {
      elem.removeAttribute("media");
    });
  };
  tempFix();
};

Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <CookiesProvider>
      <UserContextProvider>
        <ContactDetailsContextProvider>
          <AnimatePresence>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ContactDetailsContextProvider>
      </UserContextProvider>
    </CookiesProvider>
  );
}
