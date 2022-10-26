import Link from "next/link";
import s from "styles/L.module.scss";
import { signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
const Login = () => {
  return (
    <div className={s.container}>
      <Head>
        <title>Tizimga kirish</title>
      </Head>
      <h1>Kirish</h1>
      <form>
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
  );
};

export default Login;
