import { NextRouter } from "next/router";
import { portfolio } from "types/portfolio";

export const filterByUsed = (data: portfolio[]) => {
  return new Promise((resolve, reject) => {
    const all: string[] = [];
    data.map((e) => all.push(...e.used));

    resolve(Array.from(new Set(all)));
  }) as Promise<string[]>;
};
export const filterToUrl = (router: NextRouter, newUsed: string) => {
  if (typeof router.query.filter === "string") {
    const array = router.query.filter.split(",");
    array.push(newUsed);
    const arrayToUrl = array.join(",").slice(0, -1);
    console.log(router.basePath);
    router.push({
      pathname: "/page/1",
      query: { filter: arrayToUrl },
    });
  }
};
