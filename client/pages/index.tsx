import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "styles/Index.module.scss";
import backGroundImage from "images/back.jpg";
import { Navbar, Footer } from "components";
import { useAuth } from "utils/auth";
const Index = () => {
  const auth = useAuth();
  useEffect(() => {
    if (auth) window.location.href = "/page/1";
  }, [auth]);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          <div className={styles.leftContainer}>
            <h1 data-aos="fade-up" data-aos-duration="700">
              Portfolio masterga xush kelibsiz!
            </h1>
            <Link href="/auth/register/emailverification">
              <button
                data-aos="fade-up"
                data-aos-duration="700"
                className={styles.link}
              >
                Ro`yhatdan o`tish
              </button>
            </Link>

            <Link href="/auth/login">
              <button
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="100"
                className={styles.link}
              >
                Tizimga kirish
              </button>
            </Link>
          </div>
          <div className={styles.rightContainer}>
            <Image
              height={355}
              width={646}
              src={backGroundImage}
              alt="Background"
            />
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <h1>Loyiha haqida</h1>
          <div className={styles.grid}>
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              className={styles.column}
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
              className={styles.column}
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
              className={styles.column}
            >
              <h3>Ro`yhatdan o`tish majburiymi?</h3>
              <p>
                Ha. Ro`yhatdan o`tmagan foydalanuvchilar bilan muammo yuzaga
                keladi. Iltimos tizimga kiring!
              </p>
            </div>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h1 data-aos="fade-up" data-aos-duration="700">
            Nimani kutyapsiz? Hammani lol qoldirish vaqti keldi!
          </h1>
          <Link href="/auth/register">
            <button
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              className={styles.link}
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
