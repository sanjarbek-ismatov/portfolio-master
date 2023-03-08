import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "styles/Page.module.scss";
import { SearchInput } from "types";

const Input = ({ handleChange, value, clear, ...rest }: SearchInput) => {
  return (
    <div {...rest}>
      <FontAwesomeIcon className={styles.icon} icon={faSearch} />
      <input
        {...rest}
        placeholder="Kerakli narsani qidiring"
        onChange={handleChange}
        value={value}
      />
      {value && (
        <FontAwesomeIcon
          onClick={() => clear()}
          className={styles.icon}
          icon={faX}
        />
      )}
    </div>
  );
};

export default Input;
