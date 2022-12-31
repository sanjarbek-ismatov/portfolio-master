import { portfolio } from "types/portfolio";
import { serverUrl } from "./serverUrl";
const url = serverUrl();
// export const getBase64FromUrl = async (url: string) => {
//   const data = await fetch(url);
//   const blob = await data.blob();
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       const base64data = reader.result;
//       resolve(base64data);
//     };
//   });
// };
export async function fetchAndSendByUrl(data: portfolio[]) {
  const array: string[] = [];
  data.map(async (e, i) => {
    console.log(e.images[0]);
    const image = await fetch(`${url}/image/${e.images[0]}`);
    const blob = await image.blob();
    array.push(URL.createObjectURL(blob));
  });
  return array;
}
