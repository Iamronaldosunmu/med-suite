import styles from "./MobileNav.module.css";

const MobileNav = () => {
    return (
        <div className={styles.mobilenavContainer}>
            <div className={styles.topRectangle}></div>
            <div className={styles.bottomRectangle}></div>
        </div>
    );
}

export default MobileNav;