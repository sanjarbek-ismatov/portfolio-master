import {
  Dialog,
  DialogStatus,
  Form,
  FormArea,
  FormInput,
  FormSubmit,
} from "components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { portfolio, useAppSelector } from "state/store";
import s from "styles/L.module.scss";
import { useAuth } from "utils/auth";

const Login = () => {
  const auth = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("Siz portfolioni joylamoqchimisiz?");
  const [form, setForm] = useState<any>();
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const state = useAppSelector((state) => state.portfolio);
  useEffect(() => {
    if (!auth) router.replace("/auth/login");
  }, [auth, router]);
  function handleSubmit() {
    form.preventDefault();
    setIsPending(true);
    setMessage("Yuklanmoqda...");
    const files = form.target["0"].files;

    const data = new FormData();

    data.append("title", form.target["1"].value);
    data.append("url", form.target["2"].value);
    data.append("description", form.target["3"].value);
    data.append("used", form.target["4"].value);
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
        <Form
          handleSubmit={(e) => {
            e.preventDefault();
            setForm(e);
          }}
          encType="multipart/form-data"
        >
          <FormInput
            type="file"
            name="images"
            placeholder="Profile uchun rasm"
            accept="image/*"
            multiple
          />
          <FormInput
            type="text"
            name="title"
            placeholder="Loyiha nomi"
            required
          />
          <FormInput
            type="url"
            name="url"
            placeholder="Loyihangizga havola"
            required
          />
          <FormArea name="description" placeholder="Loyiha haqida batafsil" />
          <FormArea
            name="used"
            placeholder="Qaysi texnologiyalardan foydalandingiz? Masalan: reactjs, nodejs, mongodb"
          />
          <FormSubmit type="submit">Joylash</FormSubmit>
        </Form>
      </div>
      {message && state.status && (
        <Dialog
          setMessage={setMessage}
          ok={() =>
            !state.error
              ? (window.location.pathname = "/page/1")
              : setMessage("")
          }
        >
          <DialogStatus
            isError={isError}
            isSuccess={isSuccess}
            isPending={isPending}
            message={message}
          />
        </Dialog>
      )}
      {message && !state.status && (
        <Dialog
          setMessage={setMessage}
          ok={handleSubmit}
          cancel={() => setMessage("")}
        >
          <DialogStatus
            isError={isError}
            isSuccess={isSuccess}
            isPending={isPending}
            message={message}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Login;
