import Dialog from "components/Dialog";
import { useState } from "react";
import s from "styles/L.module.scss";

const Login = () => {
  const [dialog, setDialog] = useState(false);
  return (
    <div className={s.container}>
      <h1>Portfolio joylash</h1>
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
          name="title"
          placeholder="Loyiha nomi"
          required
        />
        <textarea className={s.area} />
        <button onClick={() => setDialog(true)} className={s.button}>
          Joylash
        </button>
      </form>
      {dialog && (
        <Dialog
          post={(e) => console.log("ok")}
          cancel={() => {
            setDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default Login;
