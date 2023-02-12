import Navbar from "components/Navbar";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import Footer from "components/Footer";
import type { Portfolio } from "types";
import { serverUrl } from "utils/serverUrl";
import s from "styles/M.module.scss";
import { useRouter } from "next/router";
import Input from "components/Input";
import { Filter, Panigation, Spinner } from "components";
import { filterByKey } from "utils/filterByKey";
import { InferGetServerSidePropsType } from "next";
import LazyImage from "components/LazyImage";
import { converter } from "utils/urlConverter";

// import { GetServerSideProps } from "next";
// export const getServerSideProps: GetServerSideProps<{
//   data: Portfolio[];
// }> = async (context) => {
//   context.res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=1800, stale-while-revalidate=86400"
//   );
//   const url = serverUrl();
//   const res = await fetch(`${url}/api/portfolio/all`);
//   const data: Portfolio[] = await res.json();
//   return {
//     props: {
//       data: data,
//     },
//   };
// };
const Index = (/*{
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>*/) => {
  const [data, setData] = useState<Portfolio[]>();
  const url = serverUrl();
  useEffect(() => {
    fetch(`${url}/api/portfolio/all`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  const router = useRouter();

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
    <>
      <Head>
        <title>Portfolio Master</title>
      </Head>
      <Navbar />

      <div className={s.container}>
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
              <div
                className={s.post}
                onClick={() => router.push(converter(e, e.author))}
                key={i}
              >
                <LazyImage
                  className={s.postImage}
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
                >
                  {" "}
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
                        height={100}
                        width={100}
                        filename={e.author.image}
                      />
                      <p>{e.author.firstname}</p>
                    </div>

                    <h1>{e.title}</h1>

                    <p>{e.likes.length} ta yoqtirish</p>
                  </div>
                </LazyImage>

                <div className={s.descContainer}>
                  <div className={s.filterContainer}>
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
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className={s.loading}>
            {/* <h1>Hmm, negadir bironta ham portfolio mavjud emas :(</h1> */}
            <Spinner size="100" speed="1" position="static" border="5" />
            <p>Iltimos biroz kuting. Yuklanmoqda...</p>
          </div>
        )}
      </div>
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
      {data && typeof router.query.page === "string" && (
        <Panigation index={+router.query.page} length={data?.length} />
      )}
      <Footer />
    </>
  );
};

export default Index;
