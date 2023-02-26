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
  const [dialog, setDialog] = useState(false);
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
  // useEffect(() => {
  //   if (data) {
  //     setMessage("Yuklanmoqda...");
  //     register({
  //       email: data.user?.email || "",
  //       isDirect: true,
  //     } as any);
  //   }
  // }, [data, register]);
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
            // className={s.rowInput}
            type="text"
            name="firstname"
            placeholder="Ismingiz"
            required
          />
          <FormInput
            // className={s.rowInput}
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
            value={router.query.email || ""}
            name="email"
            placeholder="Pochta"
            required
          />
          <FormInput
            // className={s.rowInput}
            type="password"
            name="password"
            placeholder="Parolni o'rnating"
            required
          />
          <FormInput
            // className={s.rowInput}
            type="password"
            name="password"
            placeholder="Qayta takrorlang"
            required
          />
          <FormInput
            // className={s.rowInput}
            type="text"
            name="telegramProfile"
            placeholder="Telegramdagi @usernameingiz"
          />
          <FormInput
            // className={s.rowInput}
            type="text"
            name="githubProfile"
            placeholder="Githubdagisi (Agar bo'lsa)"
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
        {/* <div className={s.other}>
          <button
            className={s.button}
            onClick={() => {
              signIn("github");
            }}
          >
            <FontAwesomeIcon className="icon" icon={faGithub} /> Github orqali
            davom etish
          </button>
          <button className={s.button} onClick={() => signIn("facebook")}>
            <FontAwesomeIcon className="icon" icon={faFacebook} /> Facebook
            orqali davom etish
          </button>
        </div> */}
      </div>
      {message && (
        <Dialog
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
