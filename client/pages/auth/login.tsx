import Link from "next/link";
import s from "styles/L.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import { loginInitialStateType } from "types/reducer";
import { useEffect, useState } from "react";
import Dialog from "components/Dialog";
import { useRouter } from "next/router";
import { login, useAppSelector } from "state/store";
const Login = () => {
  const state = useAppSelector(
    (state: { login: loginInitialStateType }) => state.login
  );
  const { data, status } = useSession();
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  function formik(e: any) {
    setMessage("Yuklanmoqda...");

    e.preventDefault();
    const form = new FormData();
    form.append("email", e.target["0"].value);
    form.append("password", e.target["1"].value);

    setTimeout(() => login(form), 2000);
  }
  useEffect(() => {
    setIsPending(true);
    if (state.error) {
      setIsPending(false);
      setMessage(state.error);
      setIsSuccess(false);
      setIsError(true);
    } else if (!state.error && state.status) {
      setIsPending(false);
      setMessage("Login bajarildi!");
      setIsSuccess(true);
      setIsError(false);
      localStorage.setItem("token", state.token);
    }
  }, [state]);
  useEffect(() => {
    if (data) {
      setIsPending(true);
      setMessage("Yuklanmoqda...");
      login({ email: data?.user?.email || "", isDirect: true });
    }
  }, [data]);
  return (
    <div className={s.container}>
      <Head>
        <title>Tizimga kirish</title>
      </Head>

      <div className={s.form}>
        <h1>Kirish</h1>
        <form onSubmit={formik}>
          <input
            className={s.input}
            type="email"
            name="email"
            placeholder="Pochta"
            required
          />
          <input
            className={s.input}
            type="password"
            name="password"
            placeholder="Parolni o'rnating"
            required
          />
          <button className={s.button} type={"submit"}>
            Kirish
          </button>
        </form>
        <div className={s.other}>
          <button className={s.button} onClick={() => signIn("github")}>
            <FontAwesomeIcon icon={faGithub} /> Github orqali davom etish
          </button>
          <button className={s.button} onClick={() => signIn("facebook")}>
            <FontAwesomeIcon icon={faFacebook} /> Facebook orqali davom etish
          </button>
        </div>
      </div>
      {message && (
        <Dialog
          isError={isError}
          isSuccess={isSuccess}
          ok={() => {
            setMessage("");
            !state.error && state.status && router.replace("/");
          }}
          isPending={isPending}
          message={message}
        />
      )}
    </div>
  );
};

export default Login;
