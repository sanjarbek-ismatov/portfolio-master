import { subtractTime } from "utils/dateToReadable";
import styles from "styles/Portfolio.module.scss";
function Title({ title, date }: { title: string; date: string }) {
  return (
    <div className={styles.titleContainer}>
      <h1>{title}</h1>
      <div className={styles.timeContainer}>
        <p>
          <span>{subtractTime(date)}</span>
        </p>
      </div>
    </div>
  );
}
export default Title;
