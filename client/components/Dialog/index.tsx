import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "styles/Dialog.module.scss";
import { DialogProps } from "types";
const Dialog = ({
  ok,
  cancel,
  message,
  isPending,
  okText,
  cancelText,
  isError,
  isSuccess,
  children,
}: DialogProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <h2>Diqqat!</h2>
        <div className={styles.message}>{children}</div>
        <div className={styles.buttons}>
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
