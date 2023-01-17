import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "utils/serverUrl";
const url = serverUrl();
const portfolioApi = createApi({
  reducerPath: "portfolio",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/api` }),
  endpoints(build) {
    return {
      postLikeById: build.query<boolean, string>({
        query: (id) => ({
          url: `/portfolio/like/${id}`,
          method: "POST",
        }),
      }),
    };
  },
});
export const { usePostLikeByIdQuery } = portfolioApi;
