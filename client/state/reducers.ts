import { createSlice } from "@reduxjs/toolkit";
import { registerSliceInitialStateType } from "types/reducer";
import { registerThunk } from "./thunks";
const initialState: registerSliceInitialStateType = {
  status: false,
  error: "",
};
export const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
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
