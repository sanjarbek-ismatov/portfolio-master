import Axios from "axios";
import { useSession } from "next-auth/react";
import { form } from "types/reducer";
import { getToken } from "./getDetails";
import { serverUrl } from "./serverUrl";
const url = serverUrl();
export const useAuth = () => {
  const { data } = useSession();
  const token = getToken();
  return token || data;
};
