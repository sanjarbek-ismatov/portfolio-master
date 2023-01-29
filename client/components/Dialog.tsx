import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import s from "styles/D.module.scss";
import { dialogButtonType } from "types/dialog";
const Dialog = ({
  ok,
  cancel,
  message,
  isPending,
  okText,
  cancelText,
  isError,
  isSuccess,
}: dialogButtonType) => {
  return (
    <div className={s.container}>
      <div className={s.dialog}>
        <h2>Diqqat!</h2>
        <div className={s.message}>
          {isPending && !isError && !isSuccess && (
            <div className={s.spinner}>
              <span></span>
            </div>
          )}
          {isSuccess && (
            <div className={s.icon}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
          {isError && (
            <div className={s.icon}>
              <FontAwesomeIcon icon={faX} />
            </div>
          )}
          <p>{message}</p>
        </div>
        <div className={s.buttons}>
          {ok && !isPending && <button onClick={ok}>{okText || "Ha"}</button>}
          {cancel && (
            <button onClick={cancel}>{cancelText || "Bekor qilish"}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
