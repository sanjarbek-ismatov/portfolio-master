import s from "styles/L.module.scss";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "state/thunks";
import { useEffect, useState } from "react";
import Dialog from "components/Dialog";
import { registerSliceInitialStateType } from "types/reducer";
import Head from "next/head";
import { useRouter } from "next/router";

const Register = () => {
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const state = useSelector(
    (state: { register: registerSliceInitialStateType }) => state.register
  );
  function formik(e: any) {
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

    dispatch(registerThunk(data));
    // state.status
    //   ? setIsPending(false) &&
    //   setMessage("Ro`yhatdan muvaffiqiyatli o `tdingiz!"))
    //   : setIsPending(true)
  }
  useEffect(() => {
    setIsPending(true);
    if (state.error) {
      setIsPending(false);
      setMessage("Foydalanuvchi nomi yoki paroli allaqachon foydalanilgan");
    } else if (!state.error && state.status) {
      setIsPending(false);
      setMessage("Ro`yhatdan muvaffiqiyatli o`tdingiz!");
    }
  }, [state]);
  useEffect(() => {
    setIsPending(true);
    setMessage("Yuklanmoqda!");
  }, []);
  return (
    <div className={s.container}>
      <Head>
        <title>Ro`yhatdan o`tish</title>
      </Head>
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

      {message && (
        <Dialog
          ok={() => {
            setMessage("");
            !state.error && router.replace("/auth/login");
          }}
          isPending={isPending}
          message={message}
        />
      )}
    </div>
  );
};

export default Register;
