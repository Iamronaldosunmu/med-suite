import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatButton from "../ChatButton";
import styles from "./DesktopNav.module.css";

interface DesktopNavProps {
  setContactModalShowing: Dispatch<SetStateAction<boolean>>;
  hasMessageButton?: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  setContactModalShowing,
  hasMessageButton,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (cookies.user) {
      setIsLoggedIn(true);
    }
  });

  return (
    <div className={styles.desktopnavContainer}>
      {hasMessageButton && <ChatButton />}

      {!isLoggedIn && (
        <Link href="/login">
          <p className={styles.navText}>Log In</p>
        </Link>
      )}
      {isLoggedIn && (
        <p
          className={styles.navText}
          onClick={() => {
            removeCookie("applicant");
            removeCookie("user");
            localStorage?.clear();
            router.push("/login");
            localStorage?.clear();
          }}
        >
          Logout
        </p>
      )}
      <p
        onClick={() => setContactModalShowing(true)}
        className={styles.navText}
      >
        Contact us
      </p>
    </div>
  );
};
export default DesktopNav;
