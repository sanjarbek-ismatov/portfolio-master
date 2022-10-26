import Dialog from "components/Dialog";
import { useState } from "react";
import s from "styles/L.module.scss";

const Login = () => {
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<any>();
  function handleSubmit() {
    console.log(form["1"].value);
    setDialog(false);
  }
  return (
    <div className={s.container}>
      <h1>Portfolio joylash</h1>
      <form
        onSubmit={(e) => {
          setDialog(true);
          e.preventDefault();
          setForm(e.target);
        }}
      >
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
        <button type="submit" className={s.button}>
          Joylash
        </button>
      </form>

      {dialog && (
        <Dialog
          ok={handleSubmit}
          message={"Siz portfolioni joylamoqchimisiz?"}
          cancel={() => {
            setDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default Login;
