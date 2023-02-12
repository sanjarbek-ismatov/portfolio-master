import { Portfolio, User } from "types";

export const converter = (data: Portfolio, author: User) => {
  const temp =
    "/portfolio/" + author.username + "_" + data.title.replace(" ", "+");

  return temp;
};
