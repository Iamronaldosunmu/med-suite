import styles from "./HeroImage.module.css";

const HeroImage = () => {
  return (
    <div className={styles.container}>
      <figure className={styles.heroimageContainer}>
        <img className={styles.nurseImage} src="/images/nurseimage.png" />
      </figure>
          <img className={styles.topleftImage} src="/images/topleft.svg" />
          <img className={styles.bottomrightImage} src="/icons/bottomright.svg" />
    </div>
  );
};
export default HeroImage;
