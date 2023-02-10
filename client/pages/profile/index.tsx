import React, { FC, useEffect, useState } from "react";
import { Portfolio, User } from "types";
import { getMe } from "utils/getDetails";
import Image from "next/image";
import { serverUrl } from "utils/serverUrl";
import { useAuth } from "utils/auth";
import { NavbarProfile } from "components";
import styles from "styles/Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
const Profile = () => {
  const url = serverUrl();
  const isAuth = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Portfolio[]>();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getMe().then((data) => {
      if (typeof data !== "boolean") {
        setData(data.data.portfolios);
        setUser(data.data.user);
      } else {
        router.push("/auth/login");
      }
    });
  }, []);

  return (
    <>
      <NavbarProfile />
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.innerContainer}>
            <div className={styles.rowLeft}>
              {user && (
                <>
                  <div className={styles.absoluteTextContainer}>
                    <Image
                      height={200}
                      width={200}
                      src={`${url}/image/${user.image}`}
                      className={styles.image}
                      alt="profile"
                      unoptimized
                    />
                    <div>
                      <h1>
                        {user.firstname} {user.lastname}
                      </h1>
                      <p>@{user.username}</p>
                    </div>
                  </div>

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
                  <div className={styles.skills}>
                    <h2>Skillari:</h2>
                    {user.skills.map((e, i) => (
                      <p key={i}> - {e}</p>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className={styles.rowRight}>
              <p className={styles.p}>{user?.description}</p>
              <h2 className={styles.title}>Portfoliolari:</h2>
              {data?.map((e, i) => (
                <div key={i} className={styles.portolioContainer}>
                  <div
                    style={{
                      backgroundImage: `url(${url + "/image/" + e.images[0]})`,
                      backgroundPosition: "center",
                    }}
                    className={styles.image}
                  ></div>
                  <div className={styles.content}>
                    <p>{e.title}</p>
                    <Link href={``}>
                      <a className={styles.link}>Ochish</a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
