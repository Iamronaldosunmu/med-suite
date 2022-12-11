import ProgressItem from "../ProgressItem";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ page }: { page: number }) => {
  return (
    <>
      <section className={styles.desktopContainer}>
        <ProgressItem number="1" text="Contact Details" active />
        <ProgressItem number="2" text="Documents" active={page > 1} />
        <ProgressItem number="3" text="Experience" active={page > 2} />
        <ProgressItem number="4" text="Application Fee" active={page > 3} />
        <div className={styles.progressLineContainer}>
          <div className={styles.progressLine}>
            {page > 1 && <div className={styles.progressLineSection}></div>}
            {page > 2 && <div className={styles.progressLineSection}></div>}
            {page > 3 && <div className={styles.progressLineSection}></div>}
          </div>
        </div>
          </section>
          <section className={styles.mobileContainer}>
              {page == 1 && <ProgressItem number="1" text="Contact Details" active />}
              {page == 2 && <ProgressItem number="2" text="Documents" active />}
              {page == 3 && <ProgressItem number="3" text="Experience" active />}
              {page == 4 && <ProgressItem number="4" text="Application Fee" active />}
          </section>
    </>
  );
};

export default ProgressBar;
