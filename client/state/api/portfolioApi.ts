import {
  BaseQueryFn,
  BaseQueryResult,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { commentType } from "types/portfolio";
import { getToken } from "utils/getDetails";
import { serverUrl } from "utils/serverUrl";
const url = serverUrl();
export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/api` }),
  endpoints(build) {
    return {
      postLikeById: build.mutation<{ count: number; isLiked: boolean }, string>(
        {
          query: (id) => ({
            url: `portfolio/like/${id}`,
            method: "PUT",
            headers: {
              ["x-token"]: getToken(),
            },
          }),
        }
      ),
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
      createComment: build.mutation<
        commentType[],
        { id: string; body: string }
      >({
        query(arg) {
          return {
            url: `/portfolio/comment/${arg.id}`,
            method: "PUT",
            body: arg.body,
            headers: {
              ["x-token"]: getToken(),
            },
          };
        },
      }),
      deleteComment: build.mutation<
        commentType[],
        { id: string; index: number }
      >({
        query: ({ id, index }) => ({
          method: "DELETE",
          url: `/portfolio/comment/delete/${id}?index=${index}`,
          headers: {
            ["x-token"]: getToken(),
          },
        }),
        // transformResponse(
        //   baseQueryReturnValue: BaseQueryResult<
        //     BaseQueryFn<any, commentType[]>
        //   >,
        //   meta,
        //   arg
        // ) {
        //   return baseQueryReturnValue;
        // },
      }),
    };
  },
});
export const {
  usePostLikeByIdMutation,
  useLoginUserMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = portfolioApi;
