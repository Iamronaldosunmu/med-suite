import LottieAnimation from "../Lottie";
import Loader from "../Lottie/loading_6.json";
import styles from "./Card.module.css";

interface CardProps {
  header: string;
  number: number;
  icon: string;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ header, number, icon, loading }) => {
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.cardHeader}>{header}</h3>
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          {icon == "Applications" && <img src="/images/applicationIcon.png" />}
          {icon == "Reviews" && <img src="/images/reviewIcon.png" />}
          {icon == "Submitted" && <img src="/images/submitIcon.png" />}
        </div>
        {!loading && (
          <p
            className={styles.number}
            style={{
              color:
                icon == "Applications"
                  ? "#5F6FEE"
                  : icon == "Reviews"
                  ? "#04C604"
                  : "#F0C447",
            }}
          >
            {number}
          </p>
        )}
        {loading && (
          <LottieAnimation animationData={Loader} width={100} height={50} />
        )}
      </div>
    </div>
  );
};
export default Card;
