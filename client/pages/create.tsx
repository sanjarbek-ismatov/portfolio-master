import Dialog from "components/Dialog";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { portfolio, useAppDispatch, useAppSelector } from "state/store";
import { portfolioThunk } from "state/thunks";
import s from "styles/L.module.scss";
import { portfolioSliceInitialStateType } from "types/reducer";

const Login = () => {
  const [dialog, setDialog] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("Siz portfolioni joylamoqchimisiz?");
  const [form, setForm] = useState<any>();
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const state = useAppSelector(
    (state: { portfolio: portfolioSliceInitialStateType }) => state.portfolio
  );
  const dispatch = useAppDispatch();
  function handleSubmit() {
    setIsPending(true);
    setMessage("Yuklanmoqda...");
    const files = form["0"].files;

    const data = new FormData();

    data.append("title", form["1"].value);
    data.append("url", form["2"].value);
    data.append("description", form["3"].value);

    for (const file of files) {
      data.append("images", file);
    }
    portfolio(data);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsPending(false);
      if (state.error) {
        setMessage(state.error);
        setIsSuccess(false);
        setIsError(true);
      } else if (state.status && !state.error) {
        setIsError(false);
        setIsSuccess(true);
        setMessage("Muvaffaqiyatli joylandi!");
      }
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
      {dialog && state.status && (
        <Dialog
          isError={isError}
          isSuccess={isSuccess}
          isPending={isPending}
          message={message}
          ok={() => (isSuccess && router.replace("/")) || router.reload()}
        />
      )}
      {dialog && !state.status && (
        <Dialog
          isPending={isPending}
          isError={false}
          isSuccess={false}
          message={message}
          ok={handleSubmit}
          cancel={() => setDialog(false)}
        />
      )}
    </div>
  );
};

export default Login;
