import { BaseQueryResult } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment, User } from "types";
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
      _registerUser: build.mutation<string, { body: FormData; token: string }>({
        query({ body, token }) {
          return {
            url: "/register",
            method: "POST",
            body,
            headers: {
              ["token"]: token,
            },
          };
        },
      }),
      get registerUser() {
        return this._registerUser;
      },
      _createComment: build.mutation<Comment[], { id: string; body: string }>({
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
      _deleteComment: build.mutation<Comment[], { id: string; index: number }>({
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
      _verifyEmail: build.mutation<boolean, any>({
        query: (arg) => ({
          url: "/register/send-verification",
          body: arg,
          method: "POST",
        }),
      }),
      get verifyEmail() {
        return this._verifyEmail;
      },
      _updateProfile: build.mutation<User, FormData>({
        query: (body) => ({
          url: "/user/me/update",
          method: "PUT",
          body,
          headers: {
            ["x-token"]: getToken(),
          },
        }),
      }),
      get updateProfile() {
        return this._updateProfile;
      },
      _deletePortfolio: build.mutation<string, string>({
        query: (id) => ({
          method: "DELETE",
          url: "/portfolio/delete/" + id,
          headers: {
            ["x-token"]: getToken(),
          },
        }),
      }),
      get deletePortfolio() {
        return this._deletePortfolio;
      },
      _updatePortfolio: build.mutation<string, FormData>({
        query(id) {
          return {
            url: "/portfolio/update/" + id,
            method: "PUT",
            headers: {
              ["x-token"]: getToken(),
            },
          };
        },
      }),
      get updatePortfolios() {
        return this._updatePortfolio;
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
  useVerifyEmailMutation,
  useUpdateProfileMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
