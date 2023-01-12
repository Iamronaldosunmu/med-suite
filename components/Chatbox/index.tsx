import styles from "./Chatbox.module.css";

const ChatBox = () => {
  return (
    <div className={styles.chatboxContainer}>
      <div className={styles.chatBoxInfoContainer}>
        <div className={styles.profileImageContainer}>
          <img src="https://v3.traincdn.com/genfiles/cms/pg/412/images/1f1073e2eb3241e8bf0cbd5088b8d2ae.svg" />
        </div>
        <div className={styles.chatBoxInfo}>
          <div>
            <p className={styles.name}>Dosunmu Ronald</p>
            <p className={styles.datetime}>2m ago</p>
          </div>
          <div>
            <p>ID: 123456765432nmkfn32</p>
            <p className={styles.unreadCount}>2</p>
          </div>
        </div>
      </div>
      <p className={styles.preview}>
        Hi there, I am really sorry for the late responseYour documents could
        not be uploaded, th
      </p>
    </div>
  );
};

export default ChatBox;
