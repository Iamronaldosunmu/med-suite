import styles from "./SortButton.module.css";
import { motion } from "framer-motion";

interface SortButtonProps {
  onSort: () => void;
  sortOption: number;
}

const SortButton: React.FC<SortButtonProps> = ({ onSort, sortOption }) => {
  return (
    <motion.div
      onClick={onSort}
      whileHover={{ scale: 1.04 }}
      className={styles.container}
      style={{backgroundColor: sortOption > 0 ? "#d5d5d5" : "#f5f5f5"}}
    >
      <p>Sort</p>
      <motion.img
        animate={{ rotateZ: sortOption < 2 ? "180deg" : "0deg" }}
        src="/images/sortIcon.png"
      />
    </motion.div>
  );
};

export default SortButton;
