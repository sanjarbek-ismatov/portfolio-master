import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  FormHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import styles from "./Form.module.scss";
const Form: FC<
  {
    children: ReactNode;
    title: string;
    handleSubmit: React.Dispatch<React.FormEvent>;
  } & FormHTMLAttributes<HTMLFormElement>
> = ({ children, handleSubmit, title }) => {
  return (
    <div className={styles.form}>
      <h1>{title}</h1>
      <form className={styles.formik} onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  );
};
const FormInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return <input className={styles.input} {...rest} />;
};
const FormArea: FC<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = ({ ...rest }) => {
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
