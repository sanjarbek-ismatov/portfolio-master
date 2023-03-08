import Navbar from "components/Navbar";
import { useEffect, useState } from "react";
import { Head, Page } from "components";
import Footer from "components/Footer";
import { serverUrl } from "utils/serverUrl";
import styles from "styles/Page.module.scss";
import { useRouter } from "next/router";
import Input from "components/Input";
import { Filter, Panigation, Spinner } from "components";
import { filterByKey, filterByTech } from "utils/filterByKey";
import LazyImage from "components/LazyImage";
import Link from "next/link";
import { useGetAllPortfolioQuery } from "state/api/portfolioApi";
const Index = () => {
  const [text, setText] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const router = useRouter();
  const { isLoading, data, error } = useGetAllPortfolioQuery();
  const { page, filter } = router.query;
  const url = serverUrl();
  useEffect(() => {
    if (typeof filter === "string") {
      const filtersByUrl = filter.split(",");
      setFilters(filtersByUrl);
    } else {
      setFilters([]);
    }
  }, [filter]);
  if (typeof page !== "string") {
    return null;
  }
  return (
    <>
      <Head title="Portfolio Master" />
      <Navbar />
      <div className={styles.container}>
        <Input
          clear={() => setText("")}
          className={styles.input}
          handleChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Filter
          filters={filters}
          router={router}
          filter={data}
          setFilters={setFilters}
        />
        {isLoading && (
          <div className={styles.loading}>
            <Spinner size="100" speed="1" position="static" border="5" />
            <p>Iltimos biroz kuting. Yuklanmoqda...</p>
          </div>
        )}
        {data &&
          data.length &&
          filters &&
          filterByTech(data, filters, text)
            .slice((+page - 1) * 10, +page * 10)
            .map((e, i: number) => (
              <Link key={i} href={`/portfolio/${e.linktitle}`}>
                <div className={styles.post}>
                  <LazyImage
                    className={styles.postImage}
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
                    <Page.PortfolioDescription portfolio={e} url={url} />
                  </LazyImage>

                  <Page.UsedTechnology
                    technologies={e.used}
                    router={router}
                    page={page}
                  />
                </div>
              </Link>
            ))}
        {error && "data" in error && (
          <div className={styles.loading}>
            <h1>{error.data as string}</h1>
          </div>
        )}
      </div>
      {data && <Panigation index={+page} length={data?.length} />}
      <Footer />
    </>
  );
};

export default Index;
