import { useSession } from "next-auth/react";
import { getToken } from "./getDetails";
import { serverUrl } from "./serverUrl";
export const useAuth = () => {
  const { data } = useSession();
  const token = getToken();
  return token || data;
};
export const tokenValidator = async (token: string) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${serverUrl()}/api/verify-token`, {
      method: "POST",
      headers: { ["x-token"]: token },
    });
    const result = await res.json();
    resolve(result);
  });
};
