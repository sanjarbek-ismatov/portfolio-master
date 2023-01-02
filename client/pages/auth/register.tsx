import s from "styles/L.module.scss";
import { signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import Dialog from "components/Dialog";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { register, useAppSelector } from "state/store";
const Register = () => {
  const { data } = useSession();
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const state = useAppSelector((state) => state.register);

  function formik(e: any) {
    e.preventDefault();
    setMessage("Yuklanmoqda!");
    setIsPending(true);
    if (e.target["5"].value !== e.target["6"].value) {
      setMessage("Parolni to'g'ri kiriting");
      setIsPending(false);
      setIsError(true);
      setIsSuccess(false);
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
    setTimeout(() => register(data), 2000);
  }
  useEffect(() => {
    setIsPending(true);
    if (state.error) {
      setIsPending(false);
      setIsError(true);
      setIsSuccess(false);
      setMessage(state.error);
    } else if (!state.error && state.status) {
      setIsPending(false);
      setIsSuccess(true);
      setMessage("Ro`yhatdan muvaffiqiyatli o`tdingiz!");
      setIsError(false);
    }
  }, [state]);
  useEffect(() => {
    if (data) {
      setIsPending(true);
      setMessage("Yuklanmoqda...");
      register({
        email: data.user?.email || "",
        isDirect: true,
      });
    }
  }, [data]);
  return (
    <div className={s.container}>
      <Head>
        <title>Ro`yhatdan o`tish</title>
      </Head>
      <div className={s.form}>
        <h1>Ro`yhatdan o`tish</h1>
        <form onSubmit={formik}>
          <input
            className={s.input}
            type="file"
            name="file"
            accept="image/*"
            placeholder="Profile uchun rasm"
            required
          />
          <input
            className={s.rowInput}
            type="text"
            name="firstname"
            placeholder="Ismingiz"
            required
          />
          <input
            className={s.rowInput}
            type="text"
            name="lastname"
            placeholder="Familyangiz"
            required
          />
          <input
            className={s.input}
            type="text"
            name="username"
            placeholder="Foydalanuvchi nomi"
            required
          />
          <input
            className={s.input}
            type="email"
            name="email"
            placeholder="Pochta"
            required
          />
          <input
            className={s.rowInput}
            type="password"
            name="password"
            placeholder="Parolni o'rnating"
            required
          />
          <input
            className={s.rowInput}
            type="password"
            name="password"
            placeholder="Qayta takrorlang"
            required
          />
          <input
            className={s.rowInput}
            type="text"
            name="telegramProfile"
            placeholder="Telegramdagi @usernameingiz"
          />
          <input
            className={s.rowInput}
            type="text"
            name="githubProfile"
            placeholder="Githubdagisi (Agar bo'lsa)"
          />
          <textarea
            className={s.area}
            name="description"
            placeholder="O`zingiz haqingizda"
            required
          />

          <textarea
            className={s.area}
            name="skills"
            placeholder="Qaysi texnologiyalarni bilasiz? Iltimos vergul qo`yib yozing: html, css, javascript, php, reactjs"
            required
          />
          <button className={s.button} type={"submit"}>
            Ro`yhatdan o`tish
          </button>
        </form>
        <div className={s.other}>
          <button
            className={s.button}
            onClick={() => {
              signIn("github");
            }}
          >
            <FontAwesomeIcon icon={faGithub} /> Github orqali davom etish
          </button>
          <button className={s.button} onClick={() => signIn("facebook")}>
            <FontAwesomeIcon icon={faFacebook} /> Facebook orqali davom etish
          </button>
        </div>
      </div>
      {message && (
        <Dialog
          ok={() => {
            setMessage("");
            signOut();
            !isError && isSuccess && router.replace("/auth/login");
          }}
          isPending={isPending}
          message={message}
          isError={isError}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};

export default Register;
