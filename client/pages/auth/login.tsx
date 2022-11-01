import Link from "next/link";
import s from "styles/L.module.scss";
import { signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import {
  loginInitialStateType,
  registerSliceInitialStateType,
} from "types/reducer";
import { FormEvent, useEffect, useState } from "react";
import Dialog from "components/Dialog";
import { useRouter } from "next/router";
import { loginThunk } from "state/thunks";
const Login = () => {
  const dispatch: any = useDispatch();
  const state = useSelector(
    (state: { login: loginInitialStateType }) => state.login
  );
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  function formik(e: any) {
    setMessage("Yuklanmoqda...");

    e.preventDefault();
    const form = new FormData();
    form.append("email", e.target["0"].value);
    form.append("password", e.target["1"].value);

    setTimeout(() => dispatch(loginThunk(form)), 2000);
  }
  useEffect(() => {
    setIsPending(true);
    if (state.error) {
      setIsPending(false);
      setMessage("Nimadir xato!");
    } else if (!state.error && state.status) {
      setIsPending(false);
      setMessage("Login bajarildi!");
      localStorage.setItem("token", state.token);
    }
  }, [state]);
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
