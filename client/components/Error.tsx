import React from "react";
import s from "styles/D.module.scss";
const ErrorDialog = ({
  message,
  show,
}: {
  message: string;
  show: () => void;
}) => {
  return (
    <div className={s.container}>
      <div className={s.dialog}>
        <h2>Xato!</h2>
        <p>{message}</p>
        <div className={s.buttons}>
          <button onClick={show}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
