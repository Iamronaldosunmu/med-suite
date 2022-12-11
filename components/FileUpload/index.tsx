import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  label: string;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, file, setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const onUploadContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target == containerRef.current || e.target == textRef.current)
      fileInputRef.current!.click();
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files![0]);
  };
  const onClose = () => {
    setFile(undefined);
  };
  return (
    <div className={styles.container}>
      <input
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
        {!file && (
          <>
            <img className={styles.folderImage} src="/icons/uploadIcon.svg" />
            <p ref={textRef} className={styles.text}>
              Click To Upload File
            </p>
          </>
        )}
        {file && (
          <>
            <img className={styles.folderImage} src="/icons/files.svg" />
            <div className={styles.uploaded}>
              <p>{file.name}</p>
              <img
                onClick={onClose}
                style={{ position: "relative", top: 3 }}
                src="/icons/close.svg"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
