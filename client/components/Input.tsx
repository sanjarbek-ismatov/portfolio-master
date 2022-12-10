import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { inputType } from "types/input";

const Input = ({ handleChange, value, clear, ...rest }: inputType) => {
  return (
    <div {...rest}>
      <FontAwesomeIcon className="icon" icon={faSearch} />
      <input
        {...rest}
        placeholder="Kerakli narsani qidiring"
        onChange={handleChange}
        value={value}
      />
      {value && (
        <FontAwesomeIcon onClick={() => clear()} className="icon" icon={faX} />
      )}
    </div>
  );
};

export default Input;
