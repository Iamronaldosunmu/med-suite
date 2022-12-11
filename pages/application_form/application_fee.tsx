import Button from "../../components/Button";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import styles from "../../styles/Form.module.css";

const ApplicationFee = () => {
  return (
    <main>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.progressbarContainer}>
        <ProgressBar page={4} />
      </div>
      <section className={styles.applicationFeeContainer}>
        <div className={styles.paystackLogoContainer}>
          <img className={styles.paystackLogo} src="/icons/paystackLogo.svg" />
        </div>
        <Button
          color="#11C981"
          path="/application_form/documents"
          text="Pay N2,500"
        />
        <Button path="/application_form/documents" text="Prev < Experience" />
      </section>
    </main>
  );
};
export default ApplicationFee;
