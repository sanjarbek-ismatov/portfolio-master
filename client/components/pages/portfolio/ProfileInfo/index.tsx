import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyImage } from "components";
import styles from "styles/Portfolio.module.scss";
import Link from "next/link";
import { Portfolio } from "types";

function ProfileInfo({ data, url }: { data: Portfolio; url: string }) {
  return (
    <Link href={`/profile/${data.author.username}`}>
      <div className={styles.profileContainer}>
        <LazyImage
          spinnerOptions={{
            size: "50",
            position: "absolute",
            border: "2",
            speed: "1",
          }}
          className={styles.profileImage}
          url={url}
          height={50}
          width={50}
          filename={data.author.image}
        />

        <h2 className={styles.h2}>@{data.author.username}</h2>
        {data.author.isAdmin && (
          <FontAwesomeIcon
            title="Bu foydalanuvchi admin"
            height={15}
            icon={faStar}
          />
        )}
      </div>
    </Link>
  );
}
export default ProfileInfo;
