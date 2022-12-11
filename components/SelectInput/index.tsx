import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./SelectInput.module.css";

interface SelectInputProps {
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  options?: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  setValue,
  options,
}) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <select onChange={onChange} id={label} value={value} className={styles.input}>
        <option value=""></option>
        {options?.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
export default SelectInput;
