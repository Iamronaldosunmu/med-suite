import { motion } from "framer-motion";

interface FadeInProps {
    children: JSX.Element;
    noExit?: boolean;
    scaleIn?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({ children, noExit, scaleIn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: scaleIn ? 0.8 : 1 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
          exit={noExit ? {} : { opacity: 0,  transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
};
export default FadeIn;
