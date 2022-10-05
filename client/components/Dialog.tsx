import React from "react";
import s from "styles/D.module.scss";
import { dialogButtonType } from "types/dialog";
const Dialog = ({ post, cancel }: dialogButtonType) => {
  return (
    <div className={s.container}>
      <div className={s.dialog}>
        <h2>Diqqat!</h2>
        <p>Siz portfolioni joylamoqchimisiz?</p>
        <div className={s.buttons}>
          <button onClick={post}>Ha</button>
          <button onClick={cancel}>Bekor qilish</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
