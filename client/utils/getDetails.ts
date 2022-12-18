import { like, portfolio } from "types/portfolio";
import { serverUrl } from "./serverUrl";
import axios from "axios";

export async function getMe() {
  const data = await axios.get(`${serverUrl()}/api/user/me`, {
    headers: {
      ["x-token"]: localStorage.token,
    },
  });
  return data;
}
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.token;
  }
};
export async function getLikeFromPortfolio(data: portfolio[]) {
  return new Promise(async (resolve, reject) => {
    try {
      const user: any = await getMe();

      const result: like[] = data.map((e, i) =>
        user._id in e.likes
          ? { isLiked: true, count: e.likes.length }
          : { isLiked: false, count: e.likes.length }
      );

      resolve(result);
    } catch (ex) {
      reject(ex);
    }
  });
}
