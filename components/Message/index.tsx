import styles from "./Message.module.css";

interface MessageProps {
  from: { name: string; profilePic: string };
  to: { name: string; profilePic: string };
}

const Message: React.FC<MessageProps> = ({ from, to }) => {
  return (
    <div className={`${styles.messageContainer} ${styles.adminMessageContainer}`}>
      <div className={styles.innerContainer}>
        {from?.profilePic && <div className={styles.profilePic}></div>}
        <div>
          <div className={styles.messageDetails}>
            <p className={styles.name}>Dosunmu Ronald SSSSSSSSSSSSSSSS</p>
            <p className={styles.time}>Thursday 11:40 AM</p>
          </div>
          <div className={`${styles.messageContent} ${styles.adminMessage}`}>
            I will upload the documents before the end of the day
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
