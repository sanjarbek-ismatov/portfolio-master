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
      _postLikeById: build.mutation<
        { count: number; isLiked: boolean },
        string
      >({
        query: (id) => ({
          url: `portfolio/like/${id}`,
          method: "PUT",
          headers: {
            ["x-token"]: getToken(),
          },
        }),
      }),
      get postLikeById() {
        return this._postLikeById;
      },
      _loginUser: build.mutation<
        { message: string; code: number; token: string },
        FormData
      >({
        query(body) {
          return {
            url: "login",
            method: "POST",
            body,
          };
        },
        transformResponse(baseQueryReturnValue: BaseQueryResult<any>, meta) {
          return {
            ...baseQueryReturnValue,
            token: meta?.response?.headers.get("x-token"),
          };
        },
      }),
      get loginUser() {
        return this._loginUser;
      },
      _registerUser: build.mutation<string, FormData>({
        query(body) {
          return {
            url: "/register",
            method: "POST",
            body,
          };
        },
      }),
      get registerUser() {
        return this._registerUser;
      },
      _createComment: build.mutation<
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
      get createComment() {
        return this._createComment;
      },
      _deleteComment: build.mutation<
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
      }),
      get deleteComment() {
        return this._deleteComment;
      },
    };
  },
});
export const {
  usePostLikeByIdMutation,
  useLoginUserMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useRegisterUserMutation,
} = portfolioApi;
