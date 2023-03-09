"use client";
import s from "styles/L.module.scss";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogStatus,
  Form,
  FormArea,
  FormInput,
  FormSubmit,
} from "components";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRegisterUserMutation } from "state/api/portfolioApi";
const Register = () => {
  const [message, setMessage] = useState("");
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const router = useRouter();
  function formik(e: any) {
    if (
      !(
        router.query.email &&
        router.query.token &&
        typeof router.query.token === "string"
      )
    )
      return router.replace("/auth/emailverification");
    e.preventDefault();

    setMessage("Yuklanmoqda!");
    if (e.target["5"].value !== e.target["6"].value) {
      setMessage("Parolni to'g'ri kiriting");
      return;
    }
    const data = new FormData();
    data.append("image", e.target["0"].files[0]);
    data.append("firstname", e.target["1"].value);
    data.append("lastname", e.target["2"].value);
    data.append("username", e.target["3"].value);
    data.append("email", e.target["4"].value);
    data.append("password", e.target["5"].value);
    data.append("description", e.target["9"].value);
    data.append("skills", e.target["10"].value);
    data.append("telegramProfile", e.target["7"].value);
    data.append("githubProfile", e.target["8"].value);
    register({ body: data, token: router.query.token });
  }
  useEffect(() => {
    if (error && "data" in error) {
      setMessage(error.data as string);
    } else if (isSuccess) {
      setMessage("Ro`yhatdan muvaffiqiyatli o`tdingiz!");
    }
  }, [isSuccess, error]);
  return (
    <div className={s.container}>
      <Head>
        <title>Ro`yhatdan o`tish</title>
      </Head>
      <div className={s.form}>
        <h1>Ro`yhatdan o`tish</h1>
        <Form handleSubmit={formik}>
          <FormInput
            type="file"
            name="file"
            accept="image/*"
            placeholder="Profile uchun rasm"
            required
          />
          <FormInput
            row
            type="text"
            name="firstname"
            placeholder="Ismingiz"
            required
          />
          <FormInput
            row
            type="text"
            name="lastname"
            placeholder="Familyangiz"
            required
          />
          <FormInput
            type="text"
            name="username"
            placeholder="Foydalanuvchi nomi"
            required
          />
          <FormInput
            type="email"
            defaultValue={router.query.email || ""}
            name="email"
            placeholder="Pochta"
            readOnly
            required
          />
          <FormInput
            row
            type="password"
            name="password"
            placeholder="Parolni o'rnating"
            required
          />
          <FormInput
            row
            type="password"
            name="password"
            placeholder="Qayta takrorlang"
            required
          />
          <FormInput
            row
            type="text"
            name="telegramProfile"
            placeholder="Telegramdagi @username"
          />
          <FormInput
            row
            type="text"
            name="githubProfile"
            placeholder="Githubdagi username"
          />
          <FormArea
            name="description"
            placeholder="O`zingiz haqingizda"
            required
          />

          <FormArea
            name="skills"
            placeholder="Qaysi texnologiyalarni bilasiz? Iltimos vergul qo`yib yozing: html, css, javascript, php, reactjs"
            required
          />
          <FormSubmit>Ro`yhatdan o`tish</FormSubmit>
        </Form>
      </div>
      {message && (
        <Dialog
          isLoading={isLoading}
          ok={() => {
            setMessage("");
            isSuccess && router.replace("/auth/login?home=true");
          }}
          setMessage={setMessage}
        >
          <DialogStatus
            isPending={isLoading}
            message={message}
            isError={isError}
            isSuccess={isSuccess}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Register;
