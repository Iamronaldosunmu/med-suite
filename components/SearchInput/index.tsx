import styles from "./SearchInput.module.css";

interface SearchInputProps {
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <div className={styles.searchContainer}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.56043 1.08C4.17699 1.08 1.44043 3.81656 1.44043 7.2C1.44043 10.5834 4.17699 13.32 7.56043 13.32C8.7684 13.32 9.88637 12.9656 10.8342 12.3638L15.2554 16.785L16.7854 15.255L12.4204 10.9013C13.2051 9.87188 13.6804 8.59641 13.6804 7.2C13.6804 3.81656 10.9439 1.08 7.56043 1.08ZM7.56043 2.52C10.1521 2.52 12.2404 4.60828 12.2404 7.2C12.2404 9.79172 10.1521 11.88 7.56043 11.88C4.96871 11.88 2.88043 9.79172 2.88043 7.2C2.88043 4.60828 4.96871 2.52 7.56043 2.52Z"
          fill="#8D979F"
        />
      </svg>
      <input placeholder={placeholder} className={styles.inputContainer} type="text" />
    </div>
  );
};

export default SearchInput;
