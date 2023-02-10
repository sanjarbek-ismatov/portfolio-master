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
  const [data, setData] = useState<User>();
  useEffect(() => {
    getMe().then((data) => {
      if (typeof data !== "boolean") {
        setData(data);
      } else {
        router.push("/auth/login");
      }
    });
  }, [router]);
  if (!data) {
    return null;
  }
  return (
    <>
      <NavbarProfile />
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.innerContainer}>
            <div className={styles.rowLeft}>
              <div className={styles.absoluteTextContainer}>
                <Image
                  height={200}
                  width={200}
                  src={`${url}/image/${data.image}`}
                  className={styles.image}
                  alt="profile"
                  unoptimized
                />
                <div>
                  <h1>
                    {data.firstname} {data.lastname}
                  </h1>
                  <p>@{data.username}</p>
                </div>
              </div>

              <div className={styles.socialLinksContainer}>
                <FontAwesomeIcon
                  className={styles.socialIcon}
                  icon={faGithub}
                />{" "}
                {data.githubProfile}
                <br />
                <FontAwesomeIcon
                  className={styles.socialIcon}
                  icon={faTelegram}
                />{" "}
                {data.telegramProfile}
                <br />
                <FontAwesomeIcon
                  className={styles.socialIcon}
                  icon={faEnvelope}
                />{" "}
                {data.email}
              </div>
              <div className={styles.skills}>
                <h2>Skillari:</h2>
                {data.skills.map((e, i) => (
                  <p key={i}> - {e}</p>
                ))}
              </div>
            </div>
            <div className={styles.rowRight}>
              <p className={styles.p}>{data?.description}</p>
              <h2 className={styles.title}>Portfoliolari:</h2>
              {data?.portfolios.map((e, i) => (
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
