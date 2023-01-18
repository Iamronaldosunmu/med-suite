import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
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
  return (
    <div className={styles.desktopnavContainer}>
      {hasMessageButton && <ChatButton />}
      <Link href="/login">
        <p className={styles.navText}>Log In</p>
      </Link>

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
