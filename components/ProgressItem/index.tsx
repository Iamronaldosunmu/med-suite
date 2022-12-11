import styles from "./ProgressItem.module.css";

interface ProgressItemProps {
  number: string;
    text: string;
    active?: boolean;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ number, text, active }) => {
  return (
    <div className={styles.container}>
          <div className={`${styles.progressCircle} ${active ? styles.active : styles.inactive}`}>{number}</div>
          <p style={{opacity: active ? 1 : 0.44}} className={styles.text}>{text}</p>
    </div>
  );
};

export default ProgressItem;
