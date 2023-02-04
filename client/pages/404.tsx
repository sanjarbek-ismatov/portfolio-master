import s from "styles/E.module.scss";
import gif from "public/images/giphy.gif";
import Image from "next/image";
const Error = () => {
  return (
    <div className={s.container}>
      <Image alt="404 gif" src={gif} />
      <h1 className={s.center}>Kechirasiz, Siz mavjud emas sahifadasiz!</h1>
    </div>
  );
};

export default Error;
