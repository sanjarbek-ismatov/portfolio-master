import React from "react";
import s from "styles/D.module.scss";
import { dialogButtonType } from "types/dialog";
const Dialog = ({ ok, cancel, message, isPending }: dialogButtonType) => {
  return (
    <div className={s.container}>
      <div className={s.dialog}>
        <h2>Diqqat!</h2>
        <div className={s.message}>
          {isPending && (
            <div className={s.spinner}>
              <span></span>
            </div>
          )}
          <p>{message}</p>
        </div>
        <div className={s.buttons}>
          {ok && <button onClick={ok}>Ha</button>}
          {cancel && <button onClick={cancel}>Bekor qilish</button>}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
