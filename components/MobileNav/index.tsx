import styles from "./MobileNav.module.css";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface MobileNavProps {
  setMobileNavIsOpen: Dispatch<SetStateAction<boolean>>;
  mobileNavIsOpen: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
  setMobileNavIsOpen,
  mobileNavIsOpen,
}) => {
  return (
    <>
      <div
        onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
        className={styles.mobilenavContainer}
      >
        <motion.div
          animate={
            !mobileNavIsOpen
              ? { width: 38, height: 3 }
              : { rotateZ: 45, x: -9.5, y: 5 }
          }
          className={styles.topRectangle}
        ></motion.div>
        <motion.div
          animate={
            !mobileNavIsOpen
              ? { width: 26, height: 3 }
              : { width: 38, rotateZ: -45, x: -10, y: -4 }
          }
          className={styles.bottomRectangle}
        ></motion.div>
      </div>
    </>
  );
};

export default MobileNav;
