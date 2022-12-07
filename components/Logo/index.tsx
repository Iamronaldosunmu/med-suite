import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <figure className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src="/icons/medsuitelogo.svg"
          fill
          alt="Med Suite logo"
          className={styles.image}
        />
      </div>
      <p className={styles.logoText}>Med Suite</p>
    </figure>
  );
};

export default Logo;
