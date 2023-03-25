//Imports the Portfolio type from the "types" module
import { Portfolio } from "types";

//Defines a function that filters data by a given query
export const filterByKey = (data: Portfolio[], query: string) => {
  const formattedQuery = query.trim().toLowerCase();
  return data.filter((e, i) => {
    return e.title.toLowerCase().trim().includes(formattedQuery);
  });
};

//Defines a new function that filters portfolio data by a given tech and query, using the filterByKey function and Array.prototype.every() method
export const filterByTech = (
  portfolio: Portfolio[],
  filters: string[],
  query: string
) => {
  if (!filters.length) {
    return filterByKey(portfolio, query);
  }
  const filteredByKey = filterByKey(portfolio, query);
  return filteredByKey.filter(({ used }) =>
    filters.every((filter) => used.includes(filter))
  );
};
