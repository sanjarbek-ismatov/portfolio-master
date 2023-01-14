import { portfolio } from "types/portfolio";

export const filterByUsed = (data: portfolio[]) => {
  return new Promise((resolve, reject) => {
    const all: string[] = [];
    data.map((e) => all.push(...e.used));

    resolve(Array.from(new Set(all)));
  }) as Promise<string[]>;
};
