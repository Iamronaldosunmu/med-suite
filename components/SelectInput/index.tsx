import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./SelectInput.module.css";

interface SelectInputProps {
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  options?: string[];
  onBlur: () => void;
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  setValue,
  options,
  error, 
  onBlur
}) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onBlur();
  };
  return (
    <div className={styles.container}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <select onBlur={onBlur} onChange={onChange} id={label} value={value} className={styles.input}>
        <option value=""></option>
        {options?.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
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
export default SelectInput;
