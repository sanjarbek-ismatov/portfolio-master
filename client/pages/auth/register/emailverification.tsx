import React, { FormEvent } from "react";
import s from "styles/L.module.scss";
import { useForm } from "react-hook-form";
import { useVerifyEmailMutation } from "state/api/portfolioApi";
import Dialog from 'components/Dialog';
const EmailVerification = () => {
  const [sendMail, { data, isLoading }] = useVerifyEmailMutation();
  const { handleSubmit, register } = useForm<FormEvent>();
  return (
    <div className={s.container}>
      <div className={s.form}>
        <form
          onSubmit={handleSubmit((formData) => sendMail(formData))}
          className={s.formik}
        >
          <input
            className={s.input}
            type="email"
            {...register("email")}
            placeholder="Pochta"
            required
          />
          <button className={s.button}>Tasdiqlash</button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
