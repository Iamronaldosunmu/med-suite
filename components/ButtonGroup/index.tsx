import { useRouter } from "next/router";
import styles from "./ButtonGroup.module.css";

const ButtonGroup = () => {
  const router = useRouter();
  return (
    <div className={styles.buttonGroupContainer}>
      <button onClick={() => router.push("/signup")} className={`${styles.button} ${styles.purple}`}>
        Start Application
      </button>
      <button className={`${styles.button} ${styles.orange}`}>
        Continue Application
      </button>
    </div>
  );
};
export default ButtonGroup;
