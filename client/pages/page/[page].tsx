import Navbar from "components/Navbar";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import Footer from "components/Footer";
import type { portfolio } from "types/portfolio";
import { serverUrl } from "utils/serverUrl";
import s from "styles/M.module.scss";
import { Main } from "components/Index/Main";
import { useRouter } from "next/router";
import Input from "components/Input";
import Filter from "components/Index/Filter";
import { filterByKey } from "utils/filterByKey";
import { PortfolioCard } from "components/Index/Card";
import { InferGetServerSidePropsType } from "next";
import LazyImage from "components/LazyImage";
import Spinner from "components/Spinner";
import { Description } from "components/Index/Description";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps<{
  data: portfolio[];
}> = async () => {
  const url = serverUrl();
  const res = await fetch(`${url}/api/portfolio/all`);
  const data: portfolio[] = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
const Index = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const url = serverUrl();
  const [filters, setFilters] = useState<string[]>([]);
  useMemo(() => {
    if (typeof router.query.filter === "string") {
      const filtersByUrl = router.query.filter.split(",");
      setFilters(filtersByUrl);
    } else {
      setFilters([]);
    }
  }, [router]);
  const [text, setText] = useState("");
  return (
    <div>
      <Head>
        <title>Portfolio Master</title>
      </Head>
      <Navbar />

      <Main>
        <Input
          clear={() => setText("")}
          className={s.input}
          handleChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Filter
          filters={filters}
          router={router}
          filter={data}
          setFilters={setFilters}
        />
        {data ? (
          filters &&
          filterByKey(data, text)
            .filter(({ used }) => {
              const bools: boolean[] = [];
              used.filter((el) => {
                if (!filters.length) {
                  return true;
                } else {
                  bools.push(filters.includes(el));
                }
              });
              return bools.filter((e) => e).length === filters.length;
            })
            .map((e, i: number) => (
              <PortfolioCard key={i}>
                <LazyImage
                  className={s.postImage}
                  onClick={() =>
                    router.push(
                      `/portfolio/${e.author.username}_${e.title.replace(
                        " ",
                        "+"
                      )}`
                    )
                  }
                  filename={e.images[0]}
                  width={800}
                  height={450}
                  url={url}
                  spinnerOptions={{
                    size: "100",
                    position: "absolute",
                    border: "5",
                    speed: "1",
                  }}
                />

                <Description>
                  <div className={s.desc}>
                    <div className={s.profile}>
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
                        filename={e.author.image}
                      />
                      <p>{e.author.firstname}</p>
                    </div>

                    <h1>{e.title}</h1>

                    <div>{e.likes.length} ta yoqtirish</div>
                  </div>
                  {e.used.map((e, i) => (
                    <span
                      onClick={() =>
                        router.push(`/page/${router.query.page}?filter=${e}`)
                      }
                      className={s.badge}
                      key={i}
                    >
                      {e}
                    </span>
                  ))}
                </Description>
              </PortfolioCard>
            ))
        ) : (
          <div className={s.loading}>
            <Spinner size="100" speed="1" position="static" border="5" />
          </div>
        )}
      </Main>
      {/* <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            const navbar = document.getElementById("navbar")
            window.addEventListener("scroll", () => {
              if (document.body.scrollTop > 20 || navbar.scrollTop > 20 ) {
                console.log("ok", navbar);
              }
            });
            console.log("ok")
  
          `,
        }}
      ></script> */}
      {/* <Script src="/static/index.js" /> */}
      <Footer />
    </div>
  );
};

export default Index;
