import styles from "./TableNav.module.css";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface NavItemProps {
  active?: boolean;
  text: string;
  setSelectedNav: Dispatch<SetStateAction<string>>;
}
const NavItem: React.FC<NavItemProps> = ({ active, text, setSelectedNav }) => {
  return (
    <p
      onClick={() => setSelectedNav(text)}
      className={`${styles.navItem} ${active ? styles.active : ""}`}
    >
      {text}
    </p>
  );
};

const allApplicants = { width: 138, left: 0 };
const inReview = { width: 105, x: 139 };
const submitted = { width: 105, x: 247 };

interface TableNavProps {
  selectedNav: string;
  setSelectedNav: Dispatch<SetStateAction<string>>;
}

const TableNav: React.FC<TableNavProps> = ({ selectedNav, setSelectedNav }) => {
  return (
    <div className={styles.tableNavContainer}>
      <div className={styles.textContainer}>
        <NavItem
          text="All Applicants"
          active={selectedNav == "All Applicants"}
          setSelectedNav={setSelectedNav}
        />
        <NavItem
          text="In Review"
          active={selectedNav == "In Review"}
          setSelectedNav={setSelectedNav}
        />
        <NavItem
          text="Submitted"
          active={selectedNav == "Submitted"}
          setSelectedNav={setSelectedNav}
        />
      </div>
      <div className={styles.line}>
        <motion.div
          animate={
            selectedNav == "All Applicants"
              ? allApplicants
              : selectedNav == "In Review"
              ? inReview
              : submitted
          }
                  transition={{duration: 0.2, ease: "easeIn"}}
          className={styles.selectedLine}
        ></motion.div>
      </div>
    </div>
  );
};

export default TableNav;
