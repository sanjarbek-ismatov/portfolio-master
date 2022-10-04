import {
  faFacebook,
  faInstagram,
  faTelegram,
  faVk,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronRight,
  faCircleInfo,
  faLocationPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import s from "styles/F.module.scss";
const Footer = () => {
  return (
    <footer>
      <div className={s.container}>
        <div>
          <h1>Kontakt</h1>
          <p>
            <FontAwesomeIcon icon={faEnvelopeOpen} /> Pochta:{" "}
            <a href="mailto:ismatovsanjarbek@yandex.ru">
              ismatovsanjarbek@yandex.ru
            </a>
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> Telefon:{" "}
            <a href="tel:+998902455060">+998902455060</a>
          </p>
          <p>
            <FontAwesomeIcon icon={faLocationPin} /> Surxondaryo viloyati,
            Muzrabot tumani
          </p>
        </div>
        <div>
          <h1>Menyu</h1>
          <p>
            <Link href="/auth/register">
              <a>
                <FontAwesomeIcon icon={faChevronRight} /> Ro`yhatdan o`tish
              </a>
            </Link>
          </p>
          <p>
            <Link href="/auth/login">
              <a>
                <FontAwesomeIcon icon={faChevronRight} /> Tizimga kirish
              </a>
            </Link>
          </p>
          <p>
            <Link href="/create">
              <a>
                <FontAwesomeIcon icon={faChevronRight} /> Portfolio joylash
              </a>
            </Link>
          </p>
          <p>
            <Link href="/about">
              <a>
                <FontAwesomeIcon icon={faChevronRight} /> Loyiha haqida
              </a>
            </Link>
          </p>
        </div>
        <div>
          <h1>Ijtimoiy tarmoq</h1>
          <p>
            <a href="https://t.me/sanjarbek_ismatov">
              <FontAwesomeIcon icon={faTelegram} /> Telegram
            </a>
          </p>
          <p>
            <a href="https://instagram.com/sanjarbek_ismatov">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
          </p>
          <p>
            <a href="https://t.me/sanjarbek_ismatov">
              <FontAwesomeIcon icon={faVk} /> VK
            </a>
          </p>
          <p>
            <a href="https://t.me/sanjarbek_ismatov">
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </a>
          </p>
        </div>
        <div>
          <h1>Loyiha haqida</h1>
          <p>
            <FontAwesomeIcon icon={faCircleInfo} /> Ushbu Loyiha portfolio
            joylash uchun yaratilgan sayt. Umid qilamanki undan ajoyib
            foydalanasiz!
          </p>
        </div>
      </div>
      <div className={s.copyright}>
        <p>
          Barcha huquqlar himoyalangan! <br /> Sanjarbek Ismatov{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
