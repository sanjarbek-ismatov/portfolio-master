import { Portfolio, User } from "types";
import { serverUrl } from "./serverUrl";

const url = serverUrl();
export async function getMe() {
  try {
    const res = await fetch(`${url}/api/user/me`, {
      headers: {
        ["x-token"]: localStorage.token,
      },
    });
    const data: User = await res.json();
    return data;
  } catch (ex) {
    return false;
  }
}
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.token;
  }
};

export async function getPortfolios(): Promise<Portfolio[]> {
  return new Promise(async (resolve, reject) => {
    try {
      // const user: { data: { user: User; portfolios: Portfolio[] } } =
      //   await getMe();
      const res = await fetch(`${url}/api/portfolio/all`);

      const data: Portfolio[] = await res.json();

      // if (user) {
      //   const result: likeType[] = data.map((e: portfolio, i: number) => {
      //     return e.likes.includes(user.data.user._id)
      //       ? { isLiked: true, count: e.likes.length }
      //       : { isLiked: false, count: e.likes.length };
      //   });

      resolve(data);
    } catch (ex) {
      reject(ex);
    }
  });
}
export const getUser = async (id: string) => {
  const res = await fetch(`${url}/api/user/${id}`);
  return await res.json();
};
