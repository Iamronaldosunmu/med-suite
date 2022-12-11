import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./InputGroup.module.css";

interface InputGroupProps {
    label: string; 
    setValue: Dispatch<SetStateAction<string>>;
    value: string;
    password?: boolean;
    }
const InputGroup: React.FC<InputGroupProps> = ({ label, value, setValue, password }) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return (
        <div className={styles.container}>
            <label htmlFor={label} className={styles.label}>{label}</label>
            <input id={label} onChange={onChange} value={value} className={styles.input} type={password ? "password": "text"} />
        </div>
    )
}

export default InputGroup;