import { inputType } from "types/input";

const Input = ({ handleChange, value, ...rest }: inputType) => {
  return (
    <div>
      <input onChange={handleChange} {...rest} value={value} />
    </div>
  );
};

export default Input;
