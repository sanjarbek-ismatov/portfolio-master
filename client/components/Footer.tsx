import {
  faFacebook,
  faInstagram,
  faTelegram,
  faVk,
} from "@fortawesome/free-brands-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "styles/F.module.scss";
const Footer = () => {
  return (
    <footer>
      <div className={s.container}>
        <div>
          <h1>Kontakt</h1>
          <p>
            Pochta:{" "}
            <a href="mailto:ismatovsanjarbek@yandex.ru">
              ismatovsanjarbek@yandex.ru
            </a>
          </p>
          <p>
            Telefon: <a href="tel:+998902455060">+998902455060</a>
          </p>
          <p>Surxondaryo viloyati, Muzrabot tumani</p>
        </div>
        <div>
          <h1>Menyu</h1>
          <p>
            <a href="/register">
              <FontAwesomeIcon icon={faChevronRight} /> Ro'yhatdan o'tish
            </a>
          </p>
          <p>
            <a href="/login">
              <FontAwesomeIcon icon={faChevronRight} /> Tizimga kirish
            </a>
          </p>
          <p>
            <a href="/create">
              <FontAwesomeIcon icon={faChevronRight} /> Portfoli joylash
            </a>
          </p>
          <p>
            <a href="/about">
              <FontAwesomeIcon icon={faChevronRight} /> Loyiha haqida
            </a>
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
            Pochta:{" "}
            <a href="mailto:ismatovsanjarbek@yandex.ru">
              ismatovsanjarbek@yandex.ru
            </a>
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
