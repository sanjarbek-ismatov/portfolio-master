import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { getToken } from "./getDetails";
import { serverUrl } from "./serverUrl";
export const useAuth = () => {
  // const [isAuth, setIsAuth] = useState<boolean>(false)
  const token = useMemo(() => new Boolean(getToken()).valueOf(), []);
  console.log(token);
  return token;
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
