import { Portfolio } from "types";
export const filterByKey = (data: Portfolio[], query: string) => {
  return data.filter((e, i) => {
    return e.title.toLowerCase().trim().includes(query.trim().toLowerCase());
  });
};
