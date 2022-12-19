import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./InputGroup.module.css";

interface InputGroupProps {
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  error?: string;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  setValue,
  error,
  onBlur,
  type,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <input
        id={label}
        onChange={onChange}
        type={type ? type : "text"}
        value={value}
        className={styles.input}
        onBlur={onBlur}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.error}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputGroup;
