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
      <div className={s.form}>
        <h1>Portfolio joylash</h1>
        <p>Skrinshotlarni yuklang</p>
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
            accept="image/*"
            multiple
            required
          />
          <input
            className={s.input}
            type="text"
            name="title"
            placeholder="Loyiha nomi"
            required
          />
          <textarea
            className={s.area}
            name="description"
            placeholder="Loyiha haqida batafsil"
          />
          <button type="submit" className={s.button}>
            Joylash
          </button>
        </form>
      </div>
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
