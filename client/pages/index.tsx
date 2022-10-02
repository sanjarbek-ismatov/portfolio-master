import { faHeart as liked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Navbar from "components/Navbar";
import Image from "next/image";
import s from "styles/M.module.scss";
import Input from "components/Input";
import { useState } from "react";
const Index = () => {
  const [text, setText] = useState("");
  return (
    <div>
      <Navbar />
      <main className={s.container}>
        <Input
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
      </main>
    </div>
  );
};

export default Index;
