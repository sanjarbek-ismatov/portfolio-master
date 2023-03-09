import {
  ButtonHTMLAttributes,
  ClassAttributes,
  DetailedHTMLProps,
  FC,
  FormHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { UseFormRegister } from "react-hook-form";
import { User } from "types";
import cn from "classnames";
import styles from "./Form.module.scss";
const Form: FC<
  {
    children: ReactNode;
    handleSubmit: React.Dispatch<React.FormEvent>;
  } & FormHTMLAttributes<HTMLFormElement>
> = ({ children, handleSubmit, ...rest }) => {
  return (
    <form {...rest} className={styles.formik} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
const FormInput: FC<
  ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement> & {
      register?: UseFormRegister<any>;
      fieldName?: any;
      row?: boolean;
    }
> = ({ register, row, fieldName, ...rest }) => {
  if (register)
    return (
      <input
        {...register(fieldName)}
        className={cn({
          [styles.rowInput]: row,
          [styles.input]: !row,
        })}
        {...rest}
      />
    );
  return (
    <input
      className={cn({
        [styles.rowInput]: row,
        [styles.input]: !row,
      })}
      {...rest}
    />
  );
};
const FormArea: FC<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & { fieldName?: any; register?: UseFormRegister<User> }
> = ({ fieldName, register, ...rest }) => {
  if (register)
    return (
      <textarea className={styles.area} {...register(fieldName)} {...rest} />
    );
  return <textarea className={styles.area} {...rest} />;
};
const FormSubmit: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
};
export { FormArea, FormSubmit, FormInput, Form };
