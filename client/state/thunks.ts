import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { errorType, form } from "types/reducer";
var url: string = process.env.SERVER_URL || "";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:4000";
}
export const registerThunk = createAsyncThunk(
  "register",
  async (body: form, thunkAPI) => {
    try {
      return await Axios.post(`${url}/api/register`, body);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
0;
export const loginThunk = createAsyncThunk("login", async (body: form) => {
  return await Axios.post(`${url}/api/login`, body);
});
export const portfolioThunk = createAsyncThunk(
  "portfolio",
  async (body: FormData) => {
    return await Axios.post(`${url}/api/portfolio/create`, body, {
      headers: { ["x-token"]: localStorage.token },
    });
  }
);
