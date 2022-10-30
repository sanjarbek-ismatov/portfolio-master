import { createSlice } from "@reduxjs/toolkit";
import { registerSliceInitialStateType } from "types/reducer";
import { loginThunk, registerThunk } from "./thunks";
const initialStateRegister: registerSliceInitialStateType = {
  status: false,
  error: "",
};
const initialStateLogin: registerSliceInitialStateType = {
  status: false,
  error: "",
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
    builder.addCase(registerThunk.rejected, (state, action: any) => {
      state.status = true;
      state.error = action.error.message;
    });
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
      builder.addCase(loginThunk.fulfilled, (state) => {
        state.status = true;
        state.error = "";
      });
    builder.addCase(loginThunk.rejected, (state, action: any) => {
      state.status = true;
      state.error = action.error.message;
    });
  },
});
