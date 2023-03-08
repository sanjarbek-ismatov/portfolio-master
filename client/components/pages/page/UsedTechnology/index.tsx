import { NextRouter } from "next/router";
import { Portfolio } from "types";
import styles from "styles/Page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
function UsedTechnology({
  technologies,
  router,
  page,
}: {
  technologies: Portfolio["used"];
  router: NextRouter;
  page: string;
}) {
  return (
    <div className={styles.descContainer}>
      <div className={styles.filterContainer}>
        {technologies.map((e, i) => (
          <span
            onClick={() => router.push(`/page/${page}?filter=${e}`)}
            className={styles.badge}
            key={i}
          >
            <FontAwesomeIcon className={styles.codeIcon} icon={faCode} /> {e}
          </span>
        ))}
      </div>
    </div>
  );
}
export default UsedTechnology;
