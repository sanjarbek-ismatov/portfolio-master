import { portfolio } from "types/portfolio";

export const filterByKey = (data: portfolio[], query: string) => {
  return data.filter((e, i) => {
    return e.title.toLowerCase().trim().includes(query.trim().toLowerCase());
  });
};
