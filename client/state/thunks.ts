import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { form } from "types/reducer";
var url: string = process.env.SERVER_URL || "";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:4000";
}
export const registerThunk = createAsyncThunk(
  "register",
  async (body: form) => {
    return await Axios.post(`${url}/api/register`, body);
  }
);
export const loginThunk = createAsyncThunk("login", async (body: form) => {
  return await Axios.post(`${url}/api/login`, body);
});