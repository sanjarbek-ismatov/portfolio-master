import Dialog from "components/Dialog";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { portfolioThunk } from "state/thunks";
import s from "styles/L.module.scss";
import { portfolioSliceInitialStateType } from "types/reducer";

const Login = () => {
  const [dialog, setDialog] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("Siz portfolioni joylamoqchimisiz?");
  const [form, setForm] = useState<any>();
  const state = useSelector(
    (state: { portfolio: portfolioSliceInitialStateType }) => state.portfolio
  );
  const dispatch: any = useDispatch();
  function handleSubmit() {
    setIsPending(true);
    setMessage("Yuklanmoqda...");
    const files = form["0"].files;

    const data = new FormData();

    data.append("title", form["1"].value);
    data.append("url", form["2"].value);
    data.append("description", form["3"].value);
    data.append("f", "f");
    for (const file of files) {
      data.append("images", file);
    }
    dispatch(portfolioThunk(data));
  }
  useEffect(() => {
    setTimeout(() => {
      setIsPending(false);
      if (state.error) setMessage(state.error);
      else if (state.status && !state.error)
        setMessage("Muvaffaqiyatli joylandi!");
    }, 2000);
  }, [state]);
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
          isPending={isPending}
          message={message}
          cancel={() => {
            setDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default Login;
