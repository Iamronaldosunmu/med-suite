import styles from "./InfoMessage.module.css";

interface InfoMessageProps {
  text: string;
  small?: boolean;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ text, small }) => {
  return (
    <div style={small ? {padding: '8px 8px 4px'}: {}} className={styles.container}>
      <div>
        <img
          className={styles.exclamationIcon}
          src="/icons/exclamation-mark.svg"
        />
      </div>
      <p className={styles.textContainer}>{text}</p>
    </div>
  );
};

export default InfoMessage;
