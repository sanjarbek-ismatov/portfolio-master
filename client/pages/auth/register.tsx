import Link from "next/link";
import s from "styles/L.module.scss";
import { signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FormEventHandler } from "react";
import { useDispatch } from "react-redux";
import { registerThunk } from "state/thunks";
const Register = () => {
  const dispatch: any = useDispatch();
  function formik(e: any) {
    e.preventDefault();
    dispatch(
      registerThunk({
        firstname: e.target["0"].value,
        lastname: e.target["1"].value,
        username: e.target["2"].value,
        email: e.target["3"].value,
        password: e.target["4"].value,
      })
    );
  }
  return (
    <div className={s.container}>
      <h1>Ro`yhatdan o`tish</h1>
      <form onSubmit={formik}>
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

export default Register;
