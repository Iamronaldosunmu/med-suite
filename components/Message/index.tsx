import styles from "./Message.module.css";
import { motion } from "framer-motion";
import { format } from "fecha";


interface MessageProps {
  layoutId: number;
  from: string;
  name: string;
  content: string;
  createdAt: string;
  profilePic?: string;
  adminSide?: boolean;
}

const Message: React.FC<MessageProps> = ({
  from,
  profilePic,
  name,
  createdAt,
  content,
  layoutId,
  adminSide
}) => {
  return (
    <motion.div
      layoutId={layoutId?.toString()}
      initial={{opacity: 0, y: 10, scale: 0.95}}
      animate={{opacity: 1, y: 0, scale: 1}}
      className={`${styles.messageContainer} ${
        from == "admin" ? (adminSide ? styles.adminMessageContainer : "") : (adminSide ? "" : styles.adminMessageContainer )
      }`}
    >
      <div className={styles.innerContainer}>
        {profilePic && <div className={styles.profilePic}></div>}
        <div>
          <div className={styles.messageDetails}>
            <p className={styles.name}>{name}</p>
            <p className={styles.time}>{format(new Date(createdAt), "ddd MMM Do, HH:mm")}</p>
          </div>
          <div
            className={`${styles.messageContent} ${
              from == "admin" ? (adminSide ? styles.adminMessage : "") : (adminSide ? "" : styles.adminMessage )
            }`}
          >
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
