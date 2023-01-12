import Input from "components/Input";

import { likeType, portfolio } from "types/portfolio";
import s from "styles/M.module.scss";
import { PortfolioCard } from "./Card";
import { useAppSelector } from "state/store";
import Filter from "./Filter";
export function Main({
  setText,
  text,
  data,
  likes,
  images,
  auth,
  url,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  data?: portfolio[];
  likes?: likeType[] | undefined;
  images?: string[];
  auth: any;
  url: string;
}) {
  const state = useAppSelector((state) => state.like);
  return (
    <main className={s.container}>
      <Input
        clear={() => setText("")}
        className={s.input}
        handleChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Filter />
      {data ? (
        images &&
        data.map((e, i: number) => (
          <PortfolioCard
            key={i}
            i={i}
            likes={likes}
            images={images}
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
