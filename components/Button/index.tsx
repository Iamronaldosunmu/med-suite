import Link from "next/link";
import { MouseEventHandler } from "react";
import LottieAnimation from "../Lottie";
import styles from "./Button.module.css";
import loader from "../../components/Lottie/loader.json";
import { AnimatePresence, motion } from "framer-motion";

interface ButtonProps {
  text: string;
  orange?: boolean;
  color?: string;
  onClick?: any;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  orange,
  color,
  onClick,
  loading,
}) => {
  return (
    // <Link href={path}>
    <button
      onClick={onClick ? onClick : () => {}}
      style={{
        backgroundColor: color ? color : orange ? "#FF6B00" : "#7777D6",
      }}
      className={styles.button}
    >
      <AnimatePresence>
        {!loading && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // layout
          >
            {text}
          </motion.span>
        )}
        {loading && (
          <LottieAnimation width={56} height={56} animationData={loader} />
        )}
      </AnimatePresence>
    </button>
    // </Link>
  );
};

export default Button;
