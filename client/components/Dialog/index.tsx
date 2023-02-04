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
}: DialogProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <h2>Diqqat!</h2>
        <div className={styles.message}>
          {isPending && !isError && !isSuccess && (
            <div className={styles.spinner}>
              <span></span>
            </div>
          )}
          {isSuccess && (
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
          {isError && (
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faX} />
            </div>
          )}
          <p>{message}</p>
        </div>
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
