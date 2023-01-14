import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";

const Portfolio = ({ data }: { data: portfolio & any }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Sahifa yuklanmoqda...</h1>;
  }
  if (!data) {
    return <p>Sahifa mavjud emas</p>;
  }
  return <div>{data.title} ok</div>;
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
