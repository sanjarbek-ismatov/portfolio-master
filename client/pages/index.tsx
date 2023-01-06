import Navbar from "components/Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import { GetServerSideProps } from "next";
import type { likeType, portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";
import { getLikeFromPortfolio } from "utils/getDetails";
import { useAppSelector } from "state/store";
import { isAuth } from "utils/auth";
import { Main } from "components/Index/Main";
const Index = ({ data, images }: { data: portfolio[]; images: string[] }) => {
  const [likes, setLikes] = useState<likeType[]>();
  const auth = isAuth();
  const url = serverUrl();

  const state = useAppSelector((state) => state.like);

  useEffect(() => {
    getLikeFromPortfolio()
      .then((likedata: any) => {
        setLikes(likedata);
      })
      .catch((err) => console.log(err));
  }, [data, state]);

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
        images={images}
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
export const getServerSideProps: GetServerSideProps<{
  data: portfolio[];
}> = async () => {
  const url = serverUrl();
  const res = await fetch(`${url}/api/portfolio/all`);

  const data = await res.json();
  const images = data.map(
    (e: portfolio, i: number) => `${url}/image/${e.images[0]}`
  );

  return {
    props: {
      data: data,
      images: images,
    },
  };
};
export default Index;
