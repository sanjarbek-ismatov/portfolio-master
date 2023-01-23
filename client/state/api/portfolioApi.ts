import { BaseQueryResult } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "utils/getDetails";
import { serverUrl } from "utils/serverUrl";
const url = serverUrl();
export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/api` }),
  endpoints(build) {
    return {
      postLikeById: build.mutation<{count: number; isLiked: boolean}, string>({
        query: (id) => ({
          url: `portfolio/like/${id}`,
          method: "PUT",
          headers: {
            ["x-token"]: getToken(),
          },
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
export const { usePostLikeByIdMutation, useLoginUserMutation } = portfolioApi;
