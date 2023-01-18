import styles from "./ContactUsModal.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface ContactUsModalProps {
  setShowing: Dispatch<SetStateAction<boolean>>;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ setShowing }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.closeModal}
      ></motion.div>
      <div onClick={() => setShowing(false)} className={styles.container}>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onClick={(e: any) => e.stopPropagation()}
          className={styles.modalContainer}
        >
          <img className={styles.contactIcon} src="/icons/contactUsIcon.svg" />
          <h1 className={styles.header}>Get in touch!</h1>
          <p className={styles.text}>
            {`Thanks for visiting our website and hopefully applying to MedSuite.
            Let us know if you're having any issues and we'll get back to you as
            soon as we can.`}
          </p>
          <motion.a
            whileFocus={{ scale: 0.95 }}
            href="mailto: medsuiteofficial@gmail.com"
            className={styles.ctaButton}
          >
            Send us a mail
          </motion.a>
        </motion.div>
      </div>
    </>
  );
};

export default ContactUsModal;
