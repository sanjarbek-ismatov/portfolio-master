import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
export const registerThunk = createAsyncThunk("register", (body) => {
  return Axios.post(
    "http://portfolio-master-uz.herokuapp.com/api/register",
    body
  );
});
