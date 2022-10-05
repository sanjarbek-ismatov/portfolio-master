import Link from "next/link";
import s from "styles/L.module.scss";
import { signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
const Login = () => {
  return (
    <div className={s.container}>
      <h1>Ro`yhatdan o`tish</h1>
      <form>
        <input
          className={s.input}
          type="file"
          name="file"
          placeholder="Profile uchun rasm"
          required
        />
        <input
          className={s.input}
          type="text"
          name="firstname"
          placeholder="Ismingiz"
          required
        />
        <input
          className={s.input}
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
          className={s.input}
          type="password"
          name="password"
          placeholder="Parolni o'rnating"
          required
        />
        <input
          className={s.input}
          type="password"
          name="password"
          placeholder="Qayta takrorlang"
          required
        />
        <button className={s.button} type={"submit"}>
          Ro`yhatdan o`tish
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
