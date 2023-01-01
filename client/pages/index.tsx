import { faHeart as liked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as likedHeart } from "@fortawesome/free-solid-svg-icons";
import Navbar from "components/Navbar";
import Image from "next/image";
import s from "styles/M.module.scss";
import Input from "components/Input";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "components/Footer";
import { GetServerSideProps } from "next";
import type { likeType, portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";
import { getLikeFromPortfolio, getToken } from "utils/getDetails";
import { like, useAppSelector } from "state/store";
import { useSession } from "next-auth/react";
const Index = ({ data, images }: { data: portfolio[]; images: string[] }) => {
  const [likes, setLikes] = useState<likeType[]>();
  const token = getToken();
  const { data: session } = useSession();
  const state = useAppSelector((state) => state.like);
  useEffect(() => {
    getLikeFromPortfolio(data)
      .then((likedata: any) => {
        console.log(likedata);
        setLikes(likedata);
      })
      .catch((err) => console.log(err));
    console.log("state yangilandi");
  }, [data, state.status]);

  const [text, setText] = useState("");

  return (
    <div>
      <Head>
        <title>Portfolio Master</title>
      </Head>
      <Navbar />
      <main className={s.container}>
        <Input
          clear={() => setText("")}
          className={s.input}
          handleChange={(e) => setText(e.target.value)}
          value={text}
        />
        {data.map((e, i: number) => {
          return (
            <div key={i} className={s.post}>
              {likes && (
                <Image
                  className={s.postImage}
                  loading="lazy"
                  placeholder="blur"
                  loader={() => images[i]}
                  unoptimized
                  blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
                  height={450}
                  width={800}
                  alt="portfolio rasmi"
                  src={images[i]}
                />
              )}

              <div className={s.desc}>
                <div className={s.profile}>
                  <img
                    className={s.profileImage}
                    alt="profile rasmi"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  />
                  <p>Sanjarbek Ismatov</p>
                </div>
                <h1>{e.title}</h1>
                <div>
                  {(token || session) && likes && (
                    <>
                      <FontAwesomeIcon
                        onClick={() => {
                          like(e._id);
                        }}
                        className={s.icon}
                        icon={likes[i].isLiked ? liked : faHeart}
                      />
                      <p>{likes && likes[i].count}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>
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
