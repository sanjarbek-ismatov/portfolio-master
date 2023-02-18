import React, { useState, useEffect } from "react";
import s from "styles/L.module.scss";
import { useForm } from "react-hook-form";
import { useVerifyEmailMutation } from "state/api/portfolioApi";
import { useRouter } from "next/router";
import Dialog from "components/Dialog";
import { DialogStatus, Form, FormInput, FormSubmit } from "components";
const EmailVerification = () => {
  const [sendMail, { data, isLoading, isError, isSuccess, error }] =
    useVerifyEmailMutation();
  const router = useRouter();
  const [dialog, setDialog] = useState(false);
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
          <Form
            handleSubmit={handleSubmit((formData) =>
              handleSubmitEmail(formData)
            )}
          >
            <FormInput
              type="email"
              fieldName="email"
              register={register}
              placeholder="Pochta"
              required
            />
            <FormSubmit>Tasdiqlash</FormSubmit>
          </Form>
        </div>
      </div>
      {dialog && (
        <Dialog
          setShow={setDialog}
          ok={() => {
            setMessage("");
            isSuccess && router.replace("/");
          }}
        >
          <DialogStatus
            isError={isError}
            isSuccess={isSuccess}
            isPending={isLoading}
            message={message}
          />
        </Dialog>
      )}
    </>
  );
};

export default EmailVerification;
