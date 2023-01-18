import Navbar from "components/Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Footer from "components/Footer";

import type { likeType, portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";
import { getPortfolios } from "utils/getDetails";
import { useAppSelector } from "state/store";
import { useAuth } from "utils/auth";
import { Main } from "components/Index/Main";
import { useRouter } from "next/router";

const Index = () => {
  const [likes, setLikes] = useState<likeType[]>();
  const [data, setData] = useState<portfolio[]>();

  const auth = useAuth();
  const router = useRouter();
  const url = serverUrl();
  const state = useAppSelector((state) => state.like);
  useEffect(() => {
    if (!auth) router.replace("/auth/register");
  }, [auth, router]);
  useEffect(() => {
    getPortfolios()
      .then((datas) => {
        setLikes(datas.result);

        setData(datas.data);
      })
      .catch((err) => console.log(err));
  }, [state]);

  const [text, setText] = useState("");

  return (
    <div>
      <Head>
        <title>Portfolio Master</title>
      </Head>
      <Navbar />

      <Main
        setText={setText}
        text={text}
        data={data}
        likes={likes}
        auth={auth}
        url={url}
      />
      {/* <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            const navbar = document.getElementById("navbar")
            window.addEventListener("scroll", () => {
              if (document.body.scrollTop > 20 || navbar.scrollTop > 20 ) {
                console.log("ok", navbar);
              }
            });
            console.log("ok")
  
          `,
        }}
      ></script> */}
      {/* <Script src="/static/index.js" /> */}
      <Footer />
    </div>
  );
};

export default Index;
