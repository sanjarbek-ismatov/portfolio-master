import { GetServerSideProps } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "styles/Portfolio.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";
import { Navigation, Pagination } from "swiper";
import { Navbar, LazyImage, Footer, Comment } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { usePostLikeByIdMutation } from "state/api/portfolioApi";
import { subtractTime } from "utils/dateToReadable";
const Portfolio = ({ data }: { data: portfolio }) => {
  const [createLike, { isLoading, data: likes, error }] =
    usePostLikeByIdMutation();
  if (!data) {
    return <p>Sahifa mavjud emas</p>;
  }

  const url = serverUrl();
  return (
    <>
      <Navbar />

      <div className={s.container}>
        <div className={s.main}>
          <div className={s.card}>
            <div className={s.titleContainer}>
              <h1>{data.title}</h1>
              <div className={s.timeContainer}>
                <p>
                  <span>
                    {/* {new Date(data.date).getHours()}:
                    {new Date(data.date).getMinutes()} */}
                    {subtractTime(data.date)}
                  </span>
                </p>
              </div>
            </div>
            <div className={s.swiperContainer}>
              <Swiper
                className={s.swiper}
                spaceBetween={30}
                navigation
                pagination={{
                  clickable: true,
                }}
                modules={[Navigation, Pagination]}
              >
                {data.images.map((e, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <LazyImage
                        spinnerOptions={{
                          size: "100",
                          position: "absolute",
                          border: "5",
                          speed: "1",
                        }}
                        className={s.image}
                        url={url}
                        width={800}
                        height={450}
                        filename={e}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className={s.description}>
              <div className={s.profileContainer}>
                <LazyImage
                  spinnerOptions={{
                    size: "30",
                    position: "static",
                    border: "2",
                    speed: "1",
                  }}
                  className={s.profileImage}
                  url={url}
                  height={50}
                  width={50}
                  filename={data.author.image}
                />
                <h2 className={s.h2}>@{data.author.username}</h2>
              </div>
              <div>
                <button
                  onClick={() => createLike(data._id)}
                  className={s.linkButton}
                >
                  <FontAwesomeIcon className="icon" icon={faHeart} />{" "}
                  {likes?.count || data.likes.length}
                </button>
                <a href={data.url} target="_blank" rel="noreferrer">
                  <button className={s.linkButton}>Ochish</button>
                </a>
              </div>
            </div>
            <div className={s.topic}>
              {data.used.map((e, i) => (
                <Link href={`/page/1?filter=${e}`} key={i}>
                  <a className={s.badge}>#{e}</a>
                </Link>
              ))}
            </div>
            <div className={s.descriptionContainer}>
              <p>{data.description}</p>
            </div>
            <Comment data={data} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps<{
  data: portfolio;
}> = async ({ params }) => {
  const url = serverUrl();
  const data: portfolio = await fetch(
    `${url}/api/portfolio/${params?.portfolio}`
  ).then((res) => res.json());

  if (!data) {
    return {
      props: {
        data: [],
      },
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default Portfolio;
