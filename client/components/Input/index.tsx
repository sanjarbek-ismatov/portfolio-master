import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "styles/M.module.scss";
import { SearchInput } from "types";

const Input = ({ handleChange, value, clear, ...rest }: SearchInput) => {
  return (
    <div {...rest}>
      <FontAwesomeIcon className={s.icon} icon={faSearch} />
      <input
        {...rest}
        placeholder="Kerakli narsani qidiring"
        onChange={handleChange}
        value={value}
      />
      {value && (
        <FontAwesomeIcon
          onClick={() => clear()}
          className={s.icon}
          icon={faX}
        />
      )}
    </div>
  );
};

export default Input;
