import { dataType, likeType, portfolio, user } from "types/portfolio";
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

export async function getPortfolios(): Promise<dataType> {
  return new Promise(async (resolve, reject) => {
    try {
      const user: { data: { user: user; portfolios: portfolio[] } } =
        await getMe();
      const res = await fetch(`${url}/api/portfolio/all`);

      const data: portfolio[] = await res.json();

      if (user) {
        const result: likeType[] = data.map((e: portfolio, i: number) => {
          return e.likes.includes(user.data.user._id)
            ? { isLiked: true, count: e.likes.length }
            : { isLiked: false, count: e.likes.length };
        });

        resolve({ data, result } as dataType);
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
