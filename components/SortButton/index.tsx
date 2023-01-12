import styles from "./SortButton.module.css";

const SortButton = () => {
  return (
    <div className={styles.container}>
      <p>Sort</p>
      <img src="/images/sortIcon.png" />
    </div>
  );
};

export default SortButton;
