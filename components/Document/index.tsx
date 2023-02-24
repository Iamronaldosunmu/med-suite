import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import client from "../../pages/api/Services/AxiosClient";
import DocumentProps from "../../Types/Document";
import LottieAnimation from "../Lottie";
import Loader from "../Lottie/loading_6.json";
import styles from "./Document.module.css";

interface DocumentItemProps {
  status: string;
  fileName?: string;
  url: string;
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
  public_id: string;
  documents: any[] | any;
  setDocuments: Dispatch<SetStateAction<any[]>> | Dispatch<SetStateAction<any>>;
}
const defaultDocument = {
  secure_url: "",
  public_id: "",
  fileName: "",
};

const DocumentItem: React.FC<DocumentItemProps> = ({
  status,
  fileName,
  url,
  fieldName,
  documents,
  setDocuments,
  public_id,
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
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const [file, setFile] = useState<DocumentProps>(defaultDocument);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      // Upload the file to cloudinary
      const file = e.currentTarget.files![0];
      let formData = new FormData();
      formData.append("image", e.currentTarget.files![0]);
      const { data } = await client.post("/image", formData);
      const payload: any = {};
      payload[fieldName] = {
        ...data,
        fileName: file.name,
      };

      // Delete the current Document
      let response = await client.delete(`/image/${public_id}`);

      // Handle the re-upload of the file on the backend
      let response2 = await client.post(
        `/review_documents/reupload/${cookies.user?.applicantId}`,
        payload
      );

      console.log(response, response2);

      if (fieldName !== "proofOfWork") {
        const documentsCopy = documents;
        let index = documentsCopy.findIndex(
          (document : any) => document.fieldName == fieldName
        );
        documentsCopy[index] = {
          status: "Being Reviewed",
          fieldName,
          ...payload[fieldName],
        };
        setDocuments(documentsCopy);
      }
      else {
        setDocuments({
          status: "Being Reviewed",
          ...payload[fieldName],
        })
      }


      const cookiesCopy = cookies.applicant;
      cookiesCopy.doumentReviewStatuses[fieldName] = "Being Reviewed";
      if (fieldName !== "proofOfWork") {
        cookiesCopy.documents[fieldName] = payload[fieldName];
      } else {
        cookiesCopy.experience[fieldName] = payload[fieldName];
      }
      setCookie("applicant", cookiesCopy);
      localStorage.setItem("applicant", JSON.stringify(cookiesCopy))
    } catch (error: any) {
      if (!error.response) alert("Please Check your Internet Connection🥲");
      else {
        alert(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onUploadButtonClick = (e: any) => {
    fileInputRef.current!.click();
  };

  // const;
  return (
    <div className={styles.container}>
      <p>
        <span className={styles.title}>Document Type:</span>
        <a target="_blank" rel="noreferrer" href={url}>
          {fieldNameToDocumentName[fieldName]}
        </a>
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
      {status !== "Rejected" && (
        <p>
          <span className={styles.title}>Document:</span>
          <a
            className={styles.link}
            target="_blank"
            rel="noreferrer"
            href={url}
          >
            {fileName}
          </a>
        </p>
      )}
      {status == "Rejected" && (
        <button onClick={onUploadButtonClick}>
          {!loading && <span>Re-Upload Document</span>}
          {loading && (
            <LottieAnimation animationData={Loader} width={30} height={30} />
          )}
          <input
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={onFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
            type="file"
          />
        </button>
      )}
    </div>
  );
};

export default DocumentItem;
