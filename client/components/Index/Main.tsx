import Input from "components/Input";

import { likeType, portfolio } from "types/portfolio";
import s from "styles/M.module.scss";
import { PortfolioCard } from "./Card";
import Filter from "./Filter";
import { useState } from "react";
import { filterByKey } from "utils/filterByKey";
import { useRouter } from "next/router";
export function Main({
  setText,
  text,
  data,
  likes,

  auth,
  url,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  data?: portfolio[];
  likes?: likeType[] | undefined;

  auth: any;
  url: string;
}) {
  const [filters, setFilters] = useState<string[]>([]);
  return (
    <main className={s.container}>
      <Input
        clear={() => setText("")}
        className={s.input}
        handleChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Filter filter={data} setFilters={setFilters} />
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
            <PortfolioCard
              key={i}
              i={i}
              likes={likes}
              auth={auth}
              url={url}
              e={e}
            />
          ))
      ) : (
        <h1>Yuklanmoqda...</h1>
      )}
    </main>
  );
}
