import { faHeart as liked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Navbar from "components/Navbar";
import Image from "next/image";
import s from "styles/M.module.scss";
import Input from "components/Input";
import Head from "next/head";

import { useState } from "react";
import Script from "next/script";
import Footer from "components/Footer";
const Index = () => {
  const [text, setText] = useState("");
  return (
    <div>
      <Navbar />
      <main className={s.container}>
        <Input
          clear={() => setText("")}
          className={s.input}
          handleChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className={s.post}>
          <Image
            className={s.postImage}
            loading="lazy"
            placeholder="blur"
            loader={() => "https://wallpaperaccess.com/full/138728.jpg"}
            blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
            height={450}
            width={800}
            src="https://wallpaperaccess.com/full/138728.jpg"
          />
          <div className={s.desc}>
            <div className={s.profile}>
              <img
                className={s.profileImage}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
              <p>Sanjarbek Ismatov</p>
            </div>
            <h1>MyBlog</h1>
            <div>
              <FontAwesomeIcon className={s.icon} icon={faHeart} />
              <p>10</p>
            </div>
          </div>
        </div>
        <div className={s.post}>
          <Image
            className={s.postImage}
            loading="lazy"
            placeholder="blur"
            loader={() => "https://wallpaperaccess.com/full/138728.jpg"}
            blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
            height={450}
            width={800}
            src="https://wallpaperaccess.com/full/138728.jpg"
          />
          <div className={s.desc}>
            <div className={s.profile}>
              <img
                className={s.profileImage}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
              <p>Sanjarbek Ismatov</p>
            </div>
            <h1>MyBlog</h1>
            <div>
              <FontAwesomeIcon className={s.icon} icon={faHeart} />
              <p>10</p>
            </div>
          </div>
        </div>
        <div className={s.post}>
          <Image
            className={s.postImage}
            loading="lazy"
            placeholder="blur"
            loader={() => "https://wallpaperaccess.com/full/138728.jpg"}
            blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
            height={450}
            width={800}
            src="https://wallpaperaccess.com/full/138728.jpg"
          />
          <div className={s.desc}>
            <div className={s.profile}>
              <img
                className={s.profileImage}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
              <p>Sanjarbek Ismatov</p>
            </div>
            <h1>MyBlog</h1>
            <div>
              <FontAwesomeIcon className={s.icon} icon={faHeart} />
              <p>10</p>
            </div>
          </div>
        </div>
        <div className={s.post}>
          <Image
            className={s.postImage}
            loading="lazy"
            placeholder="blur"
            loader={() => "https://wallpaperaccess.com/full/138728.jpg"}
            blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
            height={450}
            width={800}
            src="https://wallpaperaccess.com/full/138728.jpg"
          />
          <div className={s.desc}>
            <div className={s.profile}>
              <img
                className={s.profileImage}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
              <p>Sanjarbek Ismatov</p>
            </div>
            <h1>MyBlog</h1>
            <div>
              <FontAwesomeIcon className={s.icon} icon={faHeart} />
              <p>10</p>
            </div>
          </div>
        </div>
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

export default Index;
