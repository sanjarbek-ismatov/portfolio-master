import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import { useRouter } from "next/router";
import React from "react";
import { portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";
import Image from "next/image";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
const Portfolio = ({ data }: { data: portfolio }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Sahifa yuklanmoqda...</h1>;
  }
  if (!data) {
    return <p>Sahifa mavjud emas</p>;
  }
  const url = serverUrl();
  return (
    <div>
      <h1>{data.title}</h1>
      <Swiper
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
              <Image
                height={300}
                width={600}
                loader={() => `${url}/image/${e}`}
                alt="Image"
                src={`${url}/image/${e}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
// export const getStaticPaths: GetStaticPaths = async () => {
//   const url = serverUrl();
//   const data: portfolio[] = await fetch(`${url}/api/portfolio/all`).then(
//     (res) => res.json()
//   );
//   const paths = data.map((e, i) => {
//     return {
//       params: {
//         portfolio: `${e.author.username}_${e.title.replace(" ", "-")}`,
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
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
