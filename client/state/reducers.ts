import { createSlice } from "@reduxjs/toolkit";
import { registerSliceInitialStateType } from "types/reducer";
import { registerThunk } from "./thunks";

export const registerSlice = createSlice({
  name: "register",
  initialState: { status: false, error: false },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerThunk.pending, (state) => {
      state.status = false;
      state.error = false;
    }),
      builder.addCase(registerThunk.fulfilled, (state, action) => {
        state.status = true;
        state.error = false;
      });
    builder.addCase(registerThunk.rejected, (state) => {
      state.status = true;
      state.error = true;
    });
  },
});
