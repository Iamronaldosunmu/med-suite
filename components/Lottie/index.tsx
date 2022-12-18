import Lottie from "react-lottie";
import { motion } from "framer-motion";

interface LottieAnimationProps {
  animationData: any;
  width: number;
  height: number;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  width,
  height,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Lottie options={defaultOptions} height={height} width={width} />
    </motion.div>
  );
};

export default LottieAnimation;
