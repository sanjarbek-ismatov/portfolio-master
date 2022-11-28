import Axios from "axios";
import { form } from "types/reducer";
var url: string = process.env.SERVER_URL || "";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:4000";
}
export async function login(body: form) {
  return await Axios.post(`${url}/api/login`, body);
}
export async function register(body: form) {
  return await Axios.post(`${url}/api/register`, body);
}
