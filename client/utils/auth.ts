import Axios from "axios";
import { form } from "types/reducer";
import { serverUrl } from "./serverUrl";
const url = serverUrl();
export async function login(body: form) {
  return await Axios.post(`${url}/api/login`, body);
}
export async function register(body: form) {
  return await Axios.post(`${url}/api/register`, body);
}
