import { useRouter } from "next/router";
import Logo from "../components/Logo";
import styles from "../styles/PaymentSuccessful.module.css";

const PaymentSuccessful = () => {
  const router = useRouter();
  return (
    <main>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <section>
        <figure className={styles.mainImageContainer}>
          <img src="/images/paymentsuccessful.svg" />
        </figure>
        <p className={styles.bigText}>Payment Successful!</p>
        <p className={styles.smallText}>
          Your application has been successfully recieved and is being reviewed.
          Please check in from time to time to see the progress of your
          application.
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={() => router.push("/view_application")}>
            View Application
          </button>
          <button>Go Home</button>
        </div>
      </section>
    </main>
  );
};

export default PaymentSuccessful;
