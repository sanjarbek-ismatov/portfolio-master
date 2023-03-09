import { User } from "types";
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
export const getUser = async (id: string) => {
  const res = await fetch(`${url}/api/user/${id}`);
  return await res.json();
};
