import { faHeart as liked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Navbar from "components/Navbar";
import Image from "next/image";
import s from "styles/M.module.scss";
import Input from "components/Input";
import Head from "next/head";

import { useState } from "react";

import Footer from "components/Footer";
import { GetServerSideProps } from "next";
import { portfolio } from "types/portfolio";
const Index = ({ data }: { data: portfolio[] }) => {
  var url: string = process.env.SERVER_URL || "";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:4000";
  }
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
        {data.map((e, i) => {
          return (
            <><div className={s.post}>
              <Image
                className={s.postImage}
                loading="lazy"
                placeholder="blur"
                loader={() => `${url}/image/${e.images[0]}`}
                blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
                height={450}
                width={800}
                src={`${url}/image/${e.images[0]}`} />
              <div className={s.desc}>
                <div className={s.profile}>
                  <img
                    className={s.profileImage}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                  <p>Sanjarbek Ismatov</p>
                </div>
                <h1>MyBlog</h1>
                <div>
                  <FontAwesomeIcon className={s.icon} icon={faHeart} />
                  <p>10</p>
                </div>
              </div>
            </div></>
          )
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
export const getServerSideProps: GetServerSideProps<{ data: portfolio[] }> = async ({ params }) => {
  var url: string = process.env.SERVER_URL || "";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:4000";
  }
  const res = await fetch(`${url}/api/portfolio/all`)

  const data = await res.json()
  console.log(data)
  return {
    props: {
      data: data
    }

  }
}
export default Index;
