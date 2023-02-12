import Link from "next/link";
import styles from "./Panigation.module.scss";

const Index = ({ length, index }: { length: number; index: number }) => {
  const pagesCount = ~~(length / 10) + (length % 10 !== 0 ? 1 : 0);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <div className={styles.container}>
      <ul>
        {pages.map((e, i) => {
          return (
            <li key={i}>
              <Link href={`/page/${e}`}>
                <a>{e}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Index;
