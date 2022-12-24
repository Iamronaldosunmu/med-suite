import styles from "./Document.module.css";

interface DocumentItemProps {
  status: string;
  fileName: string;
  url: string;
}

const DocumentItem: React.FC<DocumentItemProps> = ({
  status,
  fileName,
  url,
}) => {
  const color =
    status == "Being reviewed"
      ? "#D9D9D9"
      : status == "Accepted"
      ? "#008000"
      : "#FF0000";
  return (
    <div className={styles.container}>
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
      <p>
        <span className={styles.title}>Document:</span>
        <a className={styles.link} target="_blank" rel="noreferrer" href={url}>
          {fileName}
        </a>
      </p>
    </div>
  );
};

export default DocumentItem;
