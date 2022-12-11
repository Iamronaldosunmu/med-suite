import Button from "../../components/Button";
import FadeIn from "../../components/FadeIn";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import styles from "../../styles/Form.module.css";

const ApplicationFee = () => {
  return (
    <FadeIn noExit>
      <main>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.progressbarContainer}>
          <ProgressBar page={4} />
        </div>
        <section className={styles.applicationFeeContainer}>
          <div className={styles.paystackLogoContainer}>
            <img
              className={styles.paystackLogo}
              src="/icons/paystackLogo.svg"
            />
          </div>
          <Button color="#11C981" path="" text="Pay N2,500" />
          <Button path="/application_form/documents" text="Prev < Experience" />
        </section>
      </main>
    </FadeIn>
  );
};
export default ApplicationFee;
