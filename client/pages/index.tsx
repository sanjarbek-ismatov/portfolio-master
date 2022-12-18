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
import { like, portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";
import { fetchAndSendByUrl } from "utils/getImage";
import { getLikeFromPortfolio, getToken } from "utils/getDetails";
import { useSession } from "next-auth/react";
const Index = ({ data }: { data: portfolio[] }) => {
  const url = serverUrl();
  const [imageFromUrl, setImage] = useState<string[][]>();
  const [isUsed, setIsUsed] = useState<boolean>(false);
  const [likes, setLikes] = useState<like[]>();
  const token = getToken();
  const { data: session } = useSession();
  useEffect(() => {
    fetchAndSendByUrl(data).then((data) => setImage(data));
    setTimeout(() => {
      setIsUsed(true);
    }, 2000);
  }, [data]);
  useEffect(() => {
    getLikeFromPortfolio(data)
      .then((likedata: any) => setLikes(likedata))
      .catch((err) => console.log(err));
  }, [data]);

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
            <>
              <div key={i} className={s.post}>
                {isUsed && imageFromUrl && likes && (
                  <Image
                    className={s.postImage}
                    loading="lazy"
                    placeholder="blur"
                    loader={() => imageFromUrl[i][0]}
                    blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
                    height={450}
                    width={800}
                    alt="portfolio rasmi"
                    src={
                      "https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
                    }
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
                    {(token || session) && likes && likes[i].isLiked ? (
                      <>
                        <FontAwesomeIcon className={s.icon} icon={likedHeart} />
                        <p>{likes && likes[i].count}</p>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          onClick={() => alert("You liked")}
                          className={s.icon}
                          icon={faHeart}
                        />
                        <p>{likes && likes[i].count}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
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
}> = async ({ params }) => {
  var url: string = process.env.SERVER_URL || "";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:4000";
  }
  const res = await fetch(`${url}/api/portfolio/all`);

  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
export default Index;
