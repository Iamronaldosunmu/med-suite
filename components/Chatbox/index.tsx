import client from "../../pages/api/Services/AxiosClient";
import styles from "./Chatbox.module.css";
import TimeAgo from 'react-timeago';


interface ChatBoxProps {
  name: string;
  id: string;
  selected: boolean;
  setSelectedChatbox: any;
  lastMessage: string;
  unreadCount: number;
  fetchChatboxes: () => void;
  createdAt: string;
  lastMessageFrom: string;
  profilePicUrl: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  name,
  id,
  selected,
  setSelectedChatbox,
  lastMessage,
  unreadCount,
  fetchChatboxes,
  createdAt, 
  lastMessageFrom, 
  profilePicUrl
}) => {
  const markAllAdminMessagesAsRead = async () => {
    try {
      const { data } = await client.post(
        `/messages/markAllAsRead/${id}?userType=admin`
      );
      fetchChatboxes();
    } catch (err) {
      alert("Something went wrong on the server");
      console.log(err);
    }
  };

  console.log(unreadCount);
  return (
    <div
      onClick={() => {
        markAllAdminMessagesAsRead();
        setSelectedChatbox(id);
      }}
      className={`${styles.chatboxContainer} ${
        selected ? styles.selected : ""
      }`}
    >
      <div className={styles.chatBoxInfoContainer}>
        <div className={styles.profileImageContainer}>
          <img src={profilePicUrl} />
        </div>
        <div className={styles.chatBoxInfo}>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.datetime}><TimeAgo date={createdAt} /></p>
          </div>
          <div>
            <p>ID: {id}</p>
            {unreadCount !== 0 && (
              <p className={styles.unreadCount}>{unreadCount}</p>
            )}
          </div>
        </div>
      </div>
      <p className={styles.preview}>{`${lastMessageFrom == "applicant" ? "Applicant:" : (lastMessageFrom == "admin" ? "You:" : "") } ${lastMessage}`}</p>
    </div>
  );
};

export default ChatBox;
