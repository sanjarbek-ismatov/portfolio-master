import Link from "next/link";
import s from "styles/L.module.scss";
import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import Dialog from "components/Dialog";
import { useRouter } from "next/router";

import { useLoginUserMutation } from "state/api/portfolioApi";
const Login = () => {
  const [loginUser, { isLoading, isError, isSuccess, data, error }] =
    useLoginUserMutation();
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const router = useRouter();
  function formik(e: any) {
    setMessage("Yuklanmoqda...");
    e.preventDefault();
    const form = new FormData();
    form.append("email", e.target["0"].value);
    form.append("password", e.target["1"].value);

    loginUser(form);
  }
  useEffect(() => {
    if (error && "data" in error) {
      setMessage(error.data as string);
    } else if (isSuccess) {
      setMessage("Login bajarildi!");
      data && localStorage.setItem("token", data.token);
    }
  }, [isLoading, data, isError, isSuccess, error]);
  useEffect(() => {
    return () => {
      if (session) {
        setMessage("Yuklanmoqda...");
        loginUser({ email: session?.user?.email || "", isDirect: true } as any);
      }
    };
  }, [loginUser, session]);
  return (
    <div className={s.container}>
      <Head>
        <title>Tizimga kirish</title>
      </Head>

      <div className={s.form}>
        <h1>Kirish</h1>
        <form className={s.formik} onSubmit={formik}>
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
            <FontAwesomeIcon className="icon" icon={faGithub} /> Github orqali
            davom etish
          </button>
          <button className={s.button} onClick={() => signIn("facebook")}>
            <FontAwesomeIcon className="icon" icon={faFacebook} /> Facebook
            orqali davom etish
          </button>
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
    </div>
  );
};

export default Login;
