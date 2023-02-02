import React, { FormEvent, useState } from "react";
import s from "styles/L.module.scss";
import { useForm } from "react-hook-form";
import { useVerifyEmailMutation } from "state/api/portfolioApi";
import Dialog from "components/Dialog";
const EmailVerification = () => {
  const [sendMail, { data, isLoading, error }] = useVerifyEmailMutation();
  function handleSubmitEmail(formData: FormData){
    setMessage('Yuborilmoqda...')
    sendMail(formData)
  }
  const [message, setMessage] = useState("");
  const { handleSubmit, register } = useForm<FormEvent>();
  return (
    <>
      <div className={s.container}>
        <div className={s.form}>
          <form
            onSubmit={handleSubmit((formData) => handleSubmitEmail(formData))}
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
      {message && <Dialog  />}
    </>
  );
};

export default EmailVerification;
