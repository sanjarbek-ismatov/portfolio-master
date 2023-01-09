import Footer from "components/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import s from "styles/I.module.scss";
import backGroundImage from "images/back.jpg";
import Navbar from "components/Navbar";
import { useRouter } from "next/router";
import { useAuth } from "utils/auth";

const Index = () => {
  const router = useRouter();
  const auth = useAuth();
  useEffect(() => {
    if (auth) router.replace("/page/1");
  }, [auth, router]);
  return (
    <>
      <Navbar />
      <div className={s.container}>
        <div className={s.sectionContainer}>
          <div className={s.leftContainer}>
            <h1 data-aos="fade-up" data-aos-duration="700">
              Portfolio masterga xush kelibsiz!
            </h1>
            <Link href="/auth/register">
              <button
                data-aos="fade-up"
                data-aos-duration="700"
                className={s.link}
              >
                Ro`yhatdan o`tish
              </button>
            </Link>

            <Link href="/auth/login">
              <button
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="100"
                className={s.link}
              >
                Tizimga kirish
              </button>
            </Link>
          </div>
          <div className={s.rightContainer}>
            <Image
              height={406}
              width={512}
              src={backGroundImage}
              alt="Background"
            />
          </div>
        </div>
        <div className={s.sectionContainer}>
          <h1>Loyiha haqida</h1>
          <div className={s.grid}>
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              className={s.column}
            >
              <h3>Loyiha nima uchun?</h3>
              <p>
                Ushbu loyiha dasturchilarning loyihalarini ulashish, muhokama
                qilish, tarqatish uchun qilingan.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="200"
              className={s.column}
            >
              <h3>Kim tomonidan yaratildi?</h3>
              <p>
                Bu loyihani Sanjarbek Ismatov ishlab chiqdi. Bu uning hozircha
                eng katta loyihasi.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="400"
              className={s.column}
            >
              <h3>Ro`yhatdan o`tish majburiymi?</h3>
              <p>
                Ha. Ro`yhatdan o`tmagan foydalanuvchilar bilan muammo yuzaga
                keladi. Iltimos tizimga kiring!
              </p>
            </div>
          </div>
        </div>
        <div className={s.footerSection}>
          <h1 data-aos="fade-up" data-aos-duration="700">
            Nimani kutyapsiz? Hammani lol qoldirish vaqti keldi!
          </h1>
          <Link href="/auth/register">
            <button
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              className={s.link}
            >
              Boshlash
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
