import React, { useEffect, useState } from "react";
import { Portfolio, User } from "types";
import { getMe } from "utils/getDetails";
import Image from "next/image";
import { serverUrl } from "utils/serverUrl";
import { NavbarProfile } from "components";
import styles from "styles/Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
const Profile = () => {
  const url = serverUrl();
  const [data, setData] = useState<Portfolio[]>();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getMe().then(({ data: { portfolios, user } }) => {
      setData(portfolios);
      setUser(user);
    });
  }, []);
  return (
    <>
      <NavbarProfile />
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.rowLeft}>
            {user && (
              <>
                <div className={styles.absoluteTextContainer}>
                  <h1>
                    {user.firstname} {user.lastname}
                  </h1>
                  <p>@{user.username}</p>
                </div>
                <Image
                  height={100}
                  width={100}
                  src={`${url}/image/${user.image}`}
                  alt="profile"
                  unoptimized
                />
                <div className={styles.socialLinksContainer}>
                  <FontAwesomeIcon
                    className={styles.socialIcon}
                    icon={faGithub}
                  />{" "}
                  {user.githubProfile}
                  <br />
                  <FontAwesomeIcon
                    className={styles.socialIcon}
                    icon={faTelegram}
                  />{" "}
                  {user.telegramProfile}
                  <br />
                  <FontAwesomeIcon
                    className={styles.socialIcon}
                    icon={faEnvelope}
                  />{" "}
                  {user.email}
                </div>
                <h2>Skillari</h2>
                {user.skills.map((e, i) => (
                  <p key={i}> - {e}</p>
                ))}
              </>
            )}
          </div>
          <div className={styles.rowRight}>
            <p>{user?.description}</p>
            {data?.map((e, i) => (
              <div key={i} className={styles.portolioContainer}>
                <Image
                  height={50}
                  width={50}
                  loader={() => `${url}/image/${e.images[0]}`}
                  unoptimized
                  priority
                  src={`${url}/image/${e.images[0]}`}
                  alt="portfolio"
                />
                <div className={styles.content}>
                  <h1>{e.title}</h1>
                  <Link href={``}>Ochish</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
