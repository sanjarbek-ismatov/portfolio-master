import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "styles/Dialog.module.scss";
import { DialogProps } from "types";
const Dialog = ({
  ok,
  cancel,
  okText,
  cancelText,
  isLoading,
  setMessage,
  children,
}: DialogProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={styles.dialogHeader}>
          <h2>Diqqat!</h2>
          <FontAwesomeIcon
            cursor={"pointer"}
            onClick={() => setMessage("")}
            icon={faX}
            height={20}
            width={20}
          />
        </div>
        <div className={styles.message}>{children}</div>
        <div className={styles.buttons}>
          {ok && !isLoading && <button onClick={ok}>{okText || "Ha"}</button>}
          {cancel && !isLoading && (
            <button onClick={cancel}>{cancelText || "Bekor qilish"}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
