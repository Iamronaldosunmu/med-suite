import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  path: string;
    orange?: boolean;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({ text, path, orange, color }) => {
  return (
    <Link href={path}>
      <button
        style={{ backgroundColor: color?  color : (orange ? "#FF6B00" : "#7777D6") }}
        className={styles.button}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
