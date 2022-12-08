import DesktopNav from "../DesktopNav";
import Logo from "../Logo";
import MobileNav from "../MobileNav";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbarContainer}>
            <Logo />
            <MobileNav />
            <DesktopNav />
        </nav>
    );
}
export default Navbar;