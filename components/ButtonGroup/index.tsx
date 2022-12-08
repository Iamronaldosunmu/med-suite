import styles from "./ButtonGroup.module.css";

const ButtonGroup = () => {
  return (
    <div className={styles.buttonGroupContainer}>
      <button className={`${styles.button} ${styles.purple}`}>Start Application</button>
      <button className={`${styles.button} ${styles.orange}`}>Continue Application</button>
    </div>
  );
};
export default ButtonGroup;
