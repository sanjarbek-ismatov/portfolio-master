import s from "styles/L.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Dialog, Form, FormInput, FormSubmit } from "components";
import { useRouter } from "next/router";

import { useLoginUserMutation } from "state/api/portfolioApi";
import { DialogStatus } from "components";
const Login = () => {
  const [loginUser, { isLoading, isError, isSuccess, data, error }] =
    useLoginUserMutation();
  const [message, setMessage] = useState("");
  const router = useRouter();
  function formik(e: any) {
    setMessage("Yuklanmoqda...");
    e.preventDefault();
    const form = new FormData();
    form.append("email", e.target["0"].value);
    form.append("password", e.target["1"].value);

    loginUser(form);
  }
  useEffect(() => {
    if (error && "data" in error) {
      setMessage(error.data as string);
    } else if (isSuccess) {
      setMessage("Login bajarildi!");
      data && localStorage.setItem("token", data.token);
    }
  }, [isLoading, data, isError, isSuccess, error]);
  /**
   * Next auth strategy disabled
   */
  // useEffect(() => {
  //   return () => {
  //     if (session) {
  //       setMessage("Yuklanmoqda...");
  //       loginUser({ email: session?.user?.email || "", isDirect: true } as any);
  //     }
  //   };
  // }, [loginUser, session]);
  return (
    <div className={s.container}>
      <Head>
        <title>Tizimga kirish</title>
      </Head>
      <Form title="Kirish" handleSubmit={formik}>
        <FormInput type="email" name="email" placeholder="Pochta" required />
        <FormInput
          type="password"
          name="password"
          placeholder="Parol"
          required
        />
        <FormSubmit>Kirish</FormSubmit>
      </Form>
      {/* 
          Next auth disabled
         */}

      {/* <div className={s.other}>
          <button className={s.button} onClick={() => signIn("github")}>
            <FontAwesomeIcon className="icon" icon={faGithub} /> Github orqali
            davom etish
          </button>
          <button className={s.button} onClick={() => signIn("facebook")}>
            <FontAwesomeIcon className="icon" icon={faFacebook} /> Facebook
            orqali davom etish
          </button>
        </div> */}

      {message && (
        <Dialog
          ok={() => {
            setMessage("");
            isSuccess &&
              (router.query.home ? router.replace("/") : router.back());
          }}
        >
          <DialogStatus
            isError={isError}
            isPending={isLoading}
            isSuccess={isSuccess}
            message={message}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Login;
