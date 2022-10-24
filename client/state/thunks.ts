import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { form } from "types/reducer";
export const registerThunk = createAsyncThunk("register", (body: form) => {
  return Axios.post(
    "http://portfolio-master-uz.herokuapp.com/api/register",
    body
  );
});
