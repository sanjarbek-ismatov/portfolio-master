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
  if (router.query.filter) {
    const array = router.query.filter.toString().split(",");
    if (array.includes(newUsed)) {
      array.splice(array.indexOf(newUsed), 1);
    } else {
      array.push(newUsed);
    }
    const arrayToUrl = array.join(",");
    if (!arrayToUrl) {
      router.push("/page/1");
    } else {
      router.push({
        pathname: "/page/1",
        query: { filter: arrayToUrl },
      });
    }
  }

  return true;
};
