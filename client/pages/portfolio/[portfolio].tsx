import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";

const Portfolio = ({ data }: { data: portfolio }) => {
  return <div>{data.title} ok</div>;
};
export const getStaticPaths: GetStaticPaths = async () => {
  const url = serverUrl();
  const res = await fetch(`${url}/api/portfolio/all`);
  const data: portfolio[] = await res.json();
  const paths = data.map((e, i) => {
    return {
      params: {
        portfolio: `${e.author.username}_${e.title.replace(" ", "+")}`,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps<{ data: portfolio }> = async ({
  params,
}) => {
  const url = serverUrl();
  const res = await fetch(`${url}/api/portfolio/${params?.portfolio}`);
  const data: portfolio = await res.json();
  return {
    props: {
      data,
      revalidate: 10,
    },
  };
};

export default Portfolio;
