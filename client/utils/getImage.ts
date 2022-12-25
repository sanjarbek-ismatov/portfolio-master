import { portfolio } from "types/portfolio";
import { serverUrl } from "./serverUrl";
const url = serverUrl();
export async function fetchAndSendByUrl(data: portfolio[]) {
  const array: string[] = [];
  data.map(async (e, i) => {
    await fetch(`${url}/image/${e.images[0]}`)
      .then((res) => res.blob())
      .then((image) => array.push(URL.createObjectURL(image)));
  });
  console.log(array);
  return array;
}
