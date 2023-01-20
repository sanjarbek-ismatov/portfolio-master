import axios from "axios";
import { useEffect, useState } from "react";
import { portfolio, user } from "types/portfolio";
import { getToken } from "utils/getDetails";
import { serverUrl } from "utils/serverUrl";
export const useMe = () => {
  const url = serverUrl();
  const [state, setState] = useState<{
    data: { user: user; portfolios: portfolio[] };
  }>();
  useEffect(() => {
    axios
      .get(`${url}/api/user/me`, {
        headers: {
          ["x-token"]: getToken(),
        },
      })
      .then((data) => setState(data));
  }, [url]);

  return state;
};
