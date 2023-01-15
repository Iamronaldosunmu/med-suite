import axios from "axios";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import client from "../../pages/api/Services/AxiosClient";
import DocumentProps from "../../Types/Document";
import LottieAnimation from "../Lottie";
import fileLoader from "../Lottie/fileLoader.json";
import cancelFileLoader from "../Lottie/cancelFileLoader.json";
import styles from "./FileUpload.module.css";
import { AnimatePresence, motion } from "framer-motion";

interface FileUploadProps {
  label: string;
  file: DocumentProps | undefined;
  setFile: Dispatch<SetStateAction<DocumentProps>>;
  fieldName: string;
  error?: string;
  onFileUpload?: () => void;
}

const defaultProofOfWork = {
  secure_url: "",
  public_id: "",
  fileName: "",
};

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  file,
  setFile,
  fieldName,
  error,
  onFileUpload,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const uploadImage = useRef<HTMLImageElement>(null);
  const onUploadContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (
      e.target == containerRef.current ||
      e.target == textRef.current ||
      e.target == uploadImage.current
    )
      fileInputRef.current!.click();
  };
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const file = e.currentTarget.files![0];
      let formData = new FormData();
      formData.append("image", e.currentTarget.files![0]);
      const { data } = await client.post("/image", formData);
      const payload: any = {};
      payload[fieldName] = {
        ...data,
        fileName: file.name,
      };
      const { data: backendData } = await client.patch(
        fieldName == "proofOfWork"
          ? `/applicant/experience/${cookies.user?.applicantId}/proofOfWork`
          : `/applicant/documents/${cookies.user?.applicantId}`,
        payload
      );
      setFile(payload[fieldName]);
      if (onFileUpload) onFileUpload();
    } catch (error: any) {
      if (!error.response) alert("Please Check your Internet Connection🥲");
      else {
        alert(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const onClose = async () => {
    try {
      setDeleteLoading(true);
      const response1 = await client.delete(`/image/${file?.public_id}`);
      const response2 = await client.delete(
        fieldName == "proofOfWork"
          ? `/applicant/experience/${cookies.user?.applicantId}/proofOfWork`
          : `/applicant/documents/${cookies.user?.applicantId}?fieldName=${fieldName}`
      );
      setFile(defaultProofOfWork);
    } catch (error: any) {
      if (!error.response) alert("Please Check your Internet Connection🥲");
      else {
        alert(error.response?.data?.message);
      }
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <input
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={onFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
      ></input>
      <label className={styles.label}>
        {label} <span style={{ color: "#FF0000" }}>*</span>
      </label>
      <div
        ref={containerRef}
        onClick={onUploadContainerClick}
        className={styles.uploadContainer}
      >
        <AnimatePresence>
          {!file?.fileName && !loading && (
            <>
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={uploadImage}
                className={styles.folderImage}
                src="/icons/uploadIcon.svg"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={textRef}
                className={styles.text}
              >
                Click To Upload File
              </motion.p>
            </>
          )}
          {file?.fileName && !loading && (
            <>
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={styles.folderImage}
                src="/icons/files.svg"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={styles.uploaded}
              >
                <motion.a
                  href={file.secure_url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={styles.fileName}
                >
                  {file!.fileName}
                </motion.a>
                <div>
                  {!deleteLoading && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={onClose}
                      whileHover={{ scale: 1.1 }}
                      style={{ position: "relative", top: 3 }}
                      src="/icons/close.svg"
                    />
                  )}
                  {deleteLoading && (
                    <LottieAnimation
                      width={30}
                      height={60}
                      animationData={cancelFileLoader}
                    />
                  )}
                </div>
              </motion.div>
            </>
          )}
          {loading && (
            <LottieAnimation
              width={140}
              height={78}
              animationData={fileLoader}
            />
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.error}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
