import styles from "./InfoMessage.module.css";

interface InfoMessageProps {
  text: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ text }) => {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.exclamationIcon} src="/icons/exclamation-mark.svg" />
      </div>
      <p className={styles.textContainer}>{text}</p>
    </div>
  );
};

export default InfoMessage;
