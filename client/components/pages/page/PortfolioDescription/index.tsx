import { LazyImage } from "components";
import Link from "next/link";
import styles from "styles/Page.module.scss";
import { Portfolio } from "types";
function PortfolioDescription({
  portfolio,
  url,
}: {
  portfolio: Portfolio;
  url: string;
}): JSX.Element {
  return (
    <div className={styles.desc}>
      <div className={styles.profile}>
        <Link href={`/profile/${portfolio.author.username}`}>
          <LazyImage
            spinnerOptions={{
              size: "30",
              position: "absolute",
              border: "2",
              speed: "1",
            }}
            className={styles.profileImage}
            url={url}
            height={100}
            width={100}
            filename={portfolio.author.image}
          />
        </Link>
        <p>{portfolio.author.firstname}</p>
      </div>

      <h1>{portfolio.title}</h1>

      <p>{portfolio.likes.length} ta yoqtirish</p>
    </div>
  );
}
export default PortfolioDescription;
