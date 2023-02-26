import { User } from "types";

import Image from "next/image";
import { serverUrl } from "utils/serverUrl";
import { Head, NavbarProfile } from "components";
import styles from "styles/Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${serverUrl()}/api/user/all`);
  const data: User[] = await res.json();
  const paths = data.map(({ username }) => ({
    params: {
      username,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps<{ data: User }> = async ({
  params,
}) => {
  const res = await fetch(`${serverUrl()}/api/user/${params?.username}`);
  const data: User = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};
const Profile = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const url = serverUrl();
  if (router.isFallback) {
    return <h1>Yuklanmoqda...</h1>;
  }
  return (
    <>
      <Head
        title={`${data.firstname} ${data.lastname}`}
        description={data.description}
        image={`${serverUrl()}/image/${data.image}`}
        keywords={`${data.firstname}, ${data.lastname}, ${data.username}, ${data.description}, ${data.email}, ${data.githubProfile}, ${data.telegramProfile}`}
      />
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
              {data.portfolios.length ? (
                data?.portfolios.map((e, i) => (
                  <div key={i} className={styles.portolioContainer}>
                    <div
                      style={{
                        backgroundImage: `url(${
                          url + "/image/" + e.images[0]
                        })`,
                        backgroundPosition: "center",
                      }}
                      className={styles.image}
                    ></div>
                    <div className={styles.content}>
                      <p>{e.title}</p>
                      <Link href={`/portfolio/${e.linktitle}`}>
                        <a className={styles.link}>Ochish</a>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.portolioContainer}>
                  <p>Portfolio mavjud emas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
