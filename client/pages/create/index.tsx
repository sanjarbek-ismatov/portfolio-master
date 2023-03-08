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
import { useCreatePortfolioMutation } from "state/api/portfolioApi";
import s from "styles/L.module.scss";
import { useAuth } from "utils/auth";

const Login = () => {
  const auth = useAuth();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<any>();
  const router = useRouter();
  const [createPortfolio, { isLoading, isError, isSuccess, error }] =
    useCreatePortfolioMutation();
  useEffect(() => {
    if (!auth) router.replace("/auth/login");
  }, [auth, router]);
  function handleSubmit() {
    form.preventDefault();
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
    createPortfolio(data);
  }
  useEffect(() => {
    if (error && "data" in error) {
      setMessage(error.data as string);
    } else if (isSuccess) {
      setMessage("Muvaffaqiyatli joylandi!");
    }
  }, [error, isSuccess]);
  return (
    <div className={s.container}>
      <div className={s.form}>
        <h1>Portfolio joylash</h1>
        <Form
          handleSubmit={(e) => {
            setMessage("Siz portfolioni joylamoqchimisiz?");
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
      {message &&
        (isSuccess || isError ? (
          <Dialog
            isLoading={isLoading}
            setMessage={setMessage}
            ok={() =>
              isSuccess
                ? (window.location.pathname = "/page/1")
                : setMessage("")
            }
          >
            <DialogStatus
              isError={isError}
              isSuccess={isSuccess}
              isPending={isLoading}
              message={message}
            />
          </Dialog>
        ) : (
          <Dialog
            isLoading={isLoading}
            setMessage={setMessage}
            ok={handleSubmit}
            cancel={() => setMessage("")}
          >
            <DialogStatus
              isError={isError}
              isSuccess={isSuccess}
              isPending={isLoading}
              message={message}
            />
          </Dialog>
        ))}
    </div>
  );
};

export default Login;
