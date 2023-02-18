import React, { FC } from "react";
import { DialogStatus } from "types";
import styles from "styles/Dialog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
const DialogStatus: FC<DialogStatus> = ({
  isError,
  isPending,
  isSuccess,
  message,
}) => {
  return (
    <>
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
    </>
  );
};

export default DialogStatus;
