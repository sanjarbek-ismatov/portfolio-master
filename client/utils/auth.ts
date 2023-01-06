import Axios from "axios";
import { useSession } from "next-auth/react";
import { form } from "types/reducer";
import { getToken } from "./getDetails";
import { serverUrl } from "./serverUrl";
const url = serverUrl();
export const isAuth = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  const token = getToken();
  return token || session;
};
