import React, { useState, useEffect } from "react";
import s from "styles/L.module.scss";
import { useForm } from "react-hook-form";
import { useVerifyEmailMutation } from "state/api/portfolioApi";
import { useRouter } from "next/router";
import Dialog from "components/Dialog";
const EmailVerification = () => {
  const [sendMail, { data, isLoading, isError, isSuccess, error }] =
    useVerifyEmailMutation();
  const router = useRouter();
  function handleSubmitEmail(formData: { email: string }) {
    setMessage("Yuborilmoqda...");
    sendMail(formData);
  }
  useEffect(() => {
    isSuccess
      ? setMessage("Pochtangizga xabar yuborildi!")
      : isError
      ? setMessage("Kechirasiz nimadir xato ketdi!")
      : "";
  }, [isSuccess, isError]);
  const [message, setMessage] = useState("");
  const { handleSubmit, register } = useForm<{ email: string }>();
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
      {message && (
        <Dialog
          isError={isError}
          isSuccess={isSuccess}
          ok={() => {
            setMessage("");
            isSuccess && router.replace("/");
          }}
          isPending={isLoading}
          message={message}
        />
      )}
    </>
  );
};

export default EmailVerification;
