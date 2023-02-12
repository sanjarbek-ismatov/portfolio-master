import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./Panigation.module.scss";

const Index = ({ length, index }: { length: number; index: number }) => {
  const pagesCount = ~~(length / 10) + (length % 10 !== 0 ? 1 : 0);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link href={`/page/${index > 1 ? index - 1 : index}`}>
            <a>
              <FontAwesomeIcon className={styles.icon} icon={faChevronLeft} />
            </a>
          </Link>
        </li>
        {pages.map((e, i) => {
          return (
            <li key={i}>
              <Link href={`/page/${e}`}>
                <a
                  className={cn({
                    [styles.active]: index === e,
                  })}
                >
                  {e}
                </a>
              </Link>
            </li>
          );
        })}
        <li>
          <Link href={`/page/${index < pages.length ? index + 1 : index}`}>
            <a>
              <FontAwesomeIcon className={styles.icon} icon={faChevronRight} />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Index;
