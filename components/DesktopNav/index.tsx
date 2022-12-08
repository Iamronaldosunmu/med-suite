import Link from "next/link";
import styles from "./DesktopNav.module.css";

const DesktopNav = () => {
  return (
    <div className={styles.desktopnavContainer}>
      <Link href="/login">
        <p className={styles.navText}>Log In</p>
      </Link>
      <Link href="/contact-us">
        <p className={styles.navText}>Contact us</p>
      </Link>
    </div>
  );
};
export default DesktopNav;
