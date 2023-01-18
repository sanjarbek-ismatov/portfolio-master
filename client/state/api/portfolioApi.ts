import {
  BaseQueryFn,
  BaseQueryMeta,
  BaseQueryResult,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { serverUrl } from "utils/serverUrl";
const url = serverUrl();
export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/api` }),
  endpoints(build) {
    return {
      postLikeById: build.query<boolean, string>({
        query: (id) => ({
          url: `portfolio/like/${id}`,
          method: "POST",
        }),
      }),
      loginUser: build.mutation<
        { message: string; code: number; token: string },
        FormData
      >({
        query(body) {
          return {
            url: "login",
            method: "POST",
            body: body,
          };
        },
        transformResponse(baseQueryReturnValue: BaseQueryResult<any>, meta) {
          return {
            ...baseQueryReturnValue,
            token: meta?.response?.headers.get("x-token"),
          };
        },
      }),
    };
  },
});
export const { usePostLikeByIdQuery, useLoginUserMutation } = portfolioApi;
