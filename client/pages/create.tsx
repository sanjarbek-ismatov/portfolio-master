import Dialog from "components/Dialog";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { portfolioThunk } from "state/thunks";
import s from "styles/L.module.scss";
import { portfolioSliceInitialStateType } from "types/reducer";

const Login = () => {
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<any>();
  const state = useSelector(
    (state: { portfolio: portfolioSliceInitialStateType }) => state.portfolio
  );
  const dispatch: any = useDispatch();
  function handleSubmit() {
    const files = form["0"].files;
    const converted: any = [];
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      converted.push(files[i]);
    }
    const data = new FormData();
    data.append("images", converted);
    data.append("title", form["1"].value);
    data.append("url", form["2"].value);
    data.append("description", form["3"].value);
    dispatch(portfolioThunk(data));
    console.log(converted);
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
