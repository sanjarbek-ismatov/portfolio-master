import { likeType, portfolio, user } from "types/portfolio";
import { serverUrl } from "./serverUrl";
import axios from "axios";
const url = serverUrl();
export async function getMe() {
  const data: { data: { user: user; portfolios: portfolio[] } } =
    await axios.get(`${url}/api/user/me`, {
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

export async function getLikeFromPortfolio() {
  return new Promise(async (resolve, reject) => {
    try {
      const user: any = await getMe();
      const res = await fetch(`${url}/api/portfolio/all`);

      const data = await res.json();
      if (user) {
        const result: likeType[] = data.map((e: portfolio, i: number) => {
          return e.likes.includes(user.data._id)
            ? { isLiked: true, count: e.likes.length }
            : { isLiked: false, count: e.likes.length };
        });

        resolve(result);
      }
    } catch (ex) {
      reject(ex);
    }
  });
}
export const getUser = async (id: string) => {
  const res = await fetch(`${url}/api/user/${id}`);
  return await res.json();
};
