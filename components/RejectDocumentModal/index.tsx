import styles from "./RejectDocumentModal.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { AdminContext } from "../Context/AdminContext";
import LottieAnimation from "../Lottie";
import whiteSpinner from "../../components/Lottie/loader.json";

interface RejectDocumentProps {
  setShowing: Dispatch<SetStateAction<boolean>>;
}
const fieldNameToDocumentName = {
  nursingDegree: "Nursing Degree",
  practicingLicense: "Practicing License",
  photoIdentification: "Photo Identification",
  evidenceOfRegistration: "Evidence Of Registration",
  resume: "Resume",
  referenceLetter: "Reference Letter",
  birthCertificate: "Birth Certificate",
  profilePicture: "Profile Picture",
  proofOfWork: "Proof Of Work",
};

type currentFieldNameType =
  | "nursingDegree"
  | "practicingLicense"
  | "photoIdentification"
  | "evidenceOfRegistration"
  | "resume"
  | "referenceLetter"
  | "birthCertificate"
  | "proofOfWork"
  | "profilePicture";

const RejectDocument: React.FC<RejectDocumentProps> = ({ setShowing }) => {
  const [message, setMesssage] = useState("");

  const { rejectDocument, currentFieldName } = useContext(AdminContext);
  const [rejectLoading, setRejectLoading] = useState(false);
  const documentName =
    fieldNameToDocumentName[currentFieldName as currentFieldNameType];

  const onRejectClick = () => {
    try {
      setRejectLoading(true);
      rejectDocument(currentFieldName, message);
      setShowing(false);
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.closeModal}
      ></motion.div>
      <div
        // onClick={setShowing ? () => setShowing(false) : () => {}}
        className={styles.container}
      >
        <motion.div
          initial={{ opacity: 0.8, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onClick={(e: any) => e.stopPropagation()}
          className={styles.modalContainer}
        >
          <h1 className={styles.header}>Reject Document</h1>
          <p className={styles.text}>
            {`Let the user know what is wrong with this document`}
          </p>
          <textarea
            value={message}
            onChange={(e) => setMesssage(e.target.value)}
            className={styles.rejectInput}
          ></textarea>
          <div className={styles.buttonContainer}>
            <motion.button
              onClick={!rejectLoading ? () => setShowing(false) : () => {}}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaButton}
              style={{ backgroundColor: "#909090" }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={onRejectClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaButton}
              style={{ backgroundColor: "red" }}
              disabled={Boolean(!message)}
            >
              {!rejectLoading && (
                <motion.span animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                  Reject
                </motion.span>
              )}

              {rejectLoading && (
                <LottieAnimation
                  animationData={whiteSpinner}
                  width={40}
                  height={40}
                />
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RejectDocument;
