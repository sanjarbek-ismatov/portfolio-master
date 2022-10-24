import s from "styles/L.module.scss";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "state/thunks";
import { useState } from "react";
import ErrorDialog from "components/Error";
import { registerSliceInitialStateType } from "types/reducer";

const Register = () => {
  const [error, setError] = useState("");
  const dispatch: any = useDispatch();
  const state = useSelector(
    (state: { register: registerSliceInitialStateType }) => state.register
  );
  function formik(e: any) {
    e.preventDefault();
    if (e.target["5"].value !== e.target["6"].value) {
      setError("Parolni to'g'ri kiriting");
      return;
    }

    const data = new FormData();
    data.append("image", e.target["0"].files[0]);
    data.append("firstname", e.target["1"].value);
    data.append("lastname", e.target["2"].value);
    data.append("username", e.target["3"].value);
    data.append("email", e.target["4"].value);
    data.append("password", e.target["5"].value);

    dispatch(registerThunk(data));
  }
  return (
    <div className={s.container}>
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
      {state && state.error && (
        <ErrorDialog
          show={() => {
            setError("");
          }}
          message={"Nimadir xato ketdi!"}
        />
      )}
      {error && (
        <ErrorDialog
          show={() => {
            setError("");
          }}
          message={error}
        />
      )}
    </div>
  );
};

export default Register;
