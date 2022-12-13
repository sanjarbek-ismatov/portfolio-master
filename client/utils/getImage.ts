import { portfolio } from "types/portfolio";
import { serverUrl } from "./serverUrl";
const url = serverUrl();
export async function fetchAndSendByUrl(data: portfolio[]) {
  const array: string[][] = [];
  data.map((e, i) => {
    const imageArray: string[] = [];
    e.images.map(async (e, i) => {
      await fetch(`${url}/image/${e}`)
        .then((res) => res.blob())
        .then((image) => imageArray.push(URL.createObjectURL(image)));
    });
    array.push(imageArray);
  });

  return array;
}
