import ButtonGroup from "../ButtonGroup";
import styles from "./HomeText.module.css";
import heroImageStyles from "../HeroImage/HeroImage.module.css";

const HomeText = () => {
  return (
    <article className={styles.textContainer}>
      <h1 className={styles.header}>Visa-sponsored jobs for African Nurses</h1>
      <img className={styles.circleImage} src="/icons/circles.svg" />
      <p className={styles.subtext}>
        We connect nurses all around Africa with Hospitals all over the world
        and take care of their relocation and visa-sponsorship. If you’re a
        nurse with over two years of industry experience, you should definitely
        apply.
      </p>
      <div className={heroImageStyles.mobileContainer}>
        <figure className={heroImageStyles.heroimageContainer}>
          <img
            className={heroImageStyles.nurseImage}
            src="/images/nurseimage.png"
          />
        </figure>
        <img
          className={heroImageStyles.topleftImage}
          src="/images/topleft.svg"
        />
        <img
          className={heroImageStyles.bottomrightImage}
          src="/icons/bottomright.svg"
        />
      </div>

      <ButtonGroup />
    </article>
  );
};
export default HomeText;
