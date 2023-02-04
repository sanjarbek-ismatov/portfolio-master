import { useSession } from "next-auth/react";
import { getToken } from "./getDetails";
import { serverUrl } from "./serverUrl";
export const useAuth = () => {
  const { data } = useSession();
  const token = getToken();
  return token || data;
};
