import { useContext, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import InfoMessage from "../InfoMessage";
import LottieAnimation from "../Lottie";
import styles from "./AdminDocumentItem.module.css";
import whiteSpinner from "../../components/Lottie/loader.json";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdminDocumentItemProps {
  status: string;
  fieldName:
    | "nursingDegree"
    | "practicingLicense"
    | "photoIdentification"
    | "evidenceOfRegistration"
    | "resume"
    | "referenceLetter"
    | "birthCertificate"
    | "proofOfWork"
    | "profilePicture";

  url: string;
}

const AdminDocumentItem: React.FC<AdminDocumentItemProps> = ({
  status,
  fieldName,
  url,
}) => {
  const color =
    status == "Being Reviewed"
      ? "#D9D9D9"
      : status == "Accepted"
      ? "#008000"
      : "#FF0000";

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
  const documentName = fieldNameToDocumentName[fieldName];
  const { approveDocument } = useContext(AdminContext);
  const [approveLoading, setApproveLoading] = useState(false);
  const onApproveClick = () => {
    try {
      setApproveLoading(true);
      approveDocument(fieldName);
      toast.success(`${documentName} Document Approved`);
    } catch (err: any) {
      if (err.response && err.response.status == 500)
        alert("Something went wrong on the server 🥲");
      else {
        alert("Could not Fetch data");
      }
    } finally {
      setApproveLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <p>
          <span className={styles.title}>Document:</span>
          <span className={styles.fieldName}>{documentName}</span>
        </p>
        <p>
          <span className={styles.title}>Status:</span>
          <span className={styles.value}>
            <span
              className={styles.dot}
              style={{
                backgroundColor: color,
              }}
            ></span>
            <span style={{ color }}>{status}</span>
          </span>
        </p>
        {status !== "Accepted" && status !== "Rejected" && (
          <div className={styles.buttonContainer}>
            <a href={url} target="_blank" rel="noreferrer">
              <button style={{ backgroundColor: "#2744AB" }}>View</button>
            </a>
            <button
              onClick={onApproveClick}
              style={{ backgroundColor: "#008000" }}
            >
              {!approveLoading && (
                <motion.span animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                  Accept
                </motion.span>
              )}
              {approveLoading && (
                <LottieAnimation
                  animationData={whiteSpinner}
                  width={25}
                  height={25}
                />
              )}
            </button>
            <button style={{ backgroundColor: "#FF0000" }}>Reject</button>
          </div>
        )}
        {status == "Rejected" && (
          <InfoMessage small text={"Waiting for Re-Upload"} />
        )}
      </div>
    </>
  );
};

export default AdminDocumentItem;
