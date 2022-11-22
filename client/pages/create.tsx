import Dialog from "components/Dialog";
import { FormEvent, useState } from "react";
import s from "styles/L.module.scss";

const Login = () => {
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<any>();
  function handleSubmit() {
    console.log(form);
    const data = new FormData();
    data.append("images", form["0"].files);
    data.append("title", form["1"].value);
    data.append("url", form["2"].value);
    data.append("description", form["3"].value);
    console.log(data);
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
          encType="multipart/form-data"
        >
          <input
            className={s.input}
            type="file"
            name="images"
            placeholder="Profile uchun rasm"
            accept="image/*"
            multiple
          />

          <input
            className={s.input}
            type="text"
            name="title"
            placeholder="Loyiha nomi"
            required
          />
          <input
            className={s.input}
            type="url"
            name="url"
            placeholder="Loyihangizga havola"
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
