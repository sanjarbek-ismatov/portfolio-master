import { portfolio } from "types/portfolio";
import { serverUrl } from "./serverUrl";
const url = serverUrl();
export async function fetchAndSendByUrl(data: portfolio) {
  // const array: string[][] = [];
  // data.map((e, i) => {
  //   const imageArray: string[] = [];
  //   e.images.map(async (e, i) => {
  //     // await fetch(`${url}/image/${e}`)
  //     //   .then((res) => res.blob())
  //     //   .then((image) => imageArray.push(URL.createObjectURL(image)));
  //     const image = await (await fetch(`${url}/image/${e}`)).blob()
  //     const urlImage = URL.createObjectURL(image)

  //   });
  //   array.push(imageArray);
  // });
  const image = await (await fetch(`${url}/image/${data.images[0]}`)).blob();
  const imageUrl = URL.createObjectURL(image);
  return imageUrl;
}
