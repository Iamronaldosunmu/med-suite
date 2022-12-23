import styles from "./ButtonStyles.module.css";

interface ViewApplicationButtonProps {
  text: string;
  onClick: () => void;
  active: boolean;
}

const ViewApplicationButton: React.FC<ViewApplicationButtonProps> = ({
  text,
  onClick,
  active,
}) => {
  return (
    <div onClick={() => onClick()} className={`${styles.buttonContainer} ${active ? styles.active : ""}`}>
      {text}
    </div>
  );
};
export default ViewApplicationButton;
