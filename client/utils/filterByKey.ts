import { Portfolio } from "types";
export const filterByKey = (data: Portfolio[], query: string) => {
  return data.filter((e, i) => {
    return e.title.toLowerCase().trim().includes(query.trim().toLowerCase());
  });
};
export const filterByTech = (
  portfolio: Portfolio[],
  filters: string[],
  query: string
) => {
  return filterByKey(portfolio, query).filter(({ used }) => {
    const bools: boolean[] = [];
    used.filter((el) => {
      if (!filters.length) {
        return true;
      } else {
        bools.push(filters.includes(el));
      }
    });
    return bools.filter((e) => e).length === filters.length;
  });
};
