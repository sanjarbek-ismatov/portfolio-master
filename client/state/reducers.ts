import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Like } from "types";
import {
  LoginInitialStateType,
  PortfolioSliceInitialStateType,
  RegisterSliceInitialStateType,
} from "types";
import { likeThunk, loginThunk, portfolioThunk, registerThunk } from "./thunks";
const initialStateRegister: RegisterSliceInitialStateType = {
  status: false,
  error: "",
};
const initialStateLogin: LoginInitialStateType = {
  status: false,
  error: "",
  token: "",
};
type initialStateLikeType = {
  status: string | boolean;
  error: string;
  likes: Like[];
};
const initialStateLike: initialStateLikeType = {
  status: false,
  error: "",
  likes: [],
};
export const registerSlice = createSlice({
  name: "register",
  initialState: initialStateRegister,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerThunk.pending, (state) => {
      state.status = false;
      state.error = "";
    }),
      builder.addCase(registerThunk.fulfilled, (state, action) => {
        state.status = true;
        state.error = "";
      });
    builder.addCase(
      registerThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = true;
        state.error = action.payload;
      }
    );
  },
});
export const loginSlice = createSlice({
  name: "login",
  initialState: initialStateLogin,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginThunk.pending, (state) => {
      state.status = false;
      state.error = "";
    }),
      builder.addCase(loginThunk.fulfilled, (state, action: any) => {
        state.status = true;
        state.error = "";
        state.token = action.payload.headers["x-token"];
      });
    builder.addCase(loginThunk.rejected, (state, action: any) => {
      state.status = true;
      state.error = action.payload;
    });
  },
});
const portfolioSliceInitialState: PortfolioSliceInitialStateType = {
  status: false,
  error: "",
};
export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: portfolioSliceInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(portfolioThunk.pending, (state) => {
      state.status = false;
      state.error = "";
    });
    builder.addCase(portfolioThunk.fulfilled, (state: any, action) => {
      state.error = "";
      state.status = action.payload;
    });
    builder.addCase(portfolioThunk.rejected, (state: any, action) => {
      state.status = true;
      state.error = action.error.message;
    });
  },
});
export const likeSlice = createSlice({
  name: "like",
  initialState: initialStateLike,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(likeThunk.fulfilled, (state) => {
      (state.status = true), (state.error = "");
    }),
      builder.addCase(likeThunk.pending, (state) => {
        (state.status = false), (state.error = "");
      }),
      builder.addCase(
        likeThunk.rejected,
        (state, action: PayloadAction<any>) => {
          (state.status = true), (state.error = action.payload);
        }
      );
  },
});
