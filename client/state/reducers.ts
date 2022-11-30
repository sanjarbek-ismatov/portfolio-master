import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginInitialStateType,
  portfolioSliceInitialStateType,
  registerSliceInitialStateType,
} from "types/reducer";
import { loginThunk, portfolioThunk, registerThunk } from "./thunks";
const initialStateRegister: registerSliceInitialStateType = {
  status: false,
  error: "",
};
const initialStateLogin: loginInitialStateType = {
  status: false,
  error: "",
  token: "",
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
const portfolioSliceInitialState: portfolioSliceInitialStateType = {
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
