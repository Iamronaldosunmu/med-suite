import styles from "./Item.module.css";

interface ContactDetailsItemProps {
  title: string;
  text: string;
}

const ContactDetailsItem: React.FC<ContactDetailsItemProps> = ({
  title,
  text,
}) => {
  return (
    <p className={styles.container}>
      <span className={styles.title}>{title}</span>
      <span className={styles.text}>{text}</span>
    </p>
  );
};

export default ContactDetailsItem;
