import { lazy, useEffect, useState, Suspense, useMemo } from "react";
import { Head, Page } from "components";
import { serverUrl } from "utils/serverUrl";
import styles from "styles/Page.module.scss";
import { useRouter } from "next/router";
import { Filter, Panigation, Spinner } from "components";
import { filterByTech } from "utils/filterByKey";
const LazyImage = lazy(() => import("components/LazyImage"));
const Input = lazy(() => import("components/Input"));
const Footer = lazy(() => import("components/Footer"));
const Navbar = lazy(() => import("components/Navbar"));
import Link from "next/link";
import {
  useGetAllPortfolioQuery,
  useGetAllUsersQuery,
} from "state/api/portfolioApi";

const Index = () => {
  const [text, setText] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const router = useRouter();
  const { isLoading, data, error } = useGetAllPortfolioQuery();
  const { data: userData } = useGetAllUsersQuery();
  const { page, filter } = useMemo(() => router.query, [router]);
  const url = useMemo(() => serverUrl(), []);
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
      <Suspense
        fallback={
          <div className={styles.loading}>
            <Spinner size="100" speed="1" border="5" position="static" />
          </div>
        }
      >
        <Navbar />
        <div className={styles.mainContainer}>
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
          {userData && <Page.User data={userData} />}
        </div>
        {data && <Panigation index={+page} length={data?.length} />}
        <Footer />
      </Suspense>
    </>
  );
};

export default Index;
