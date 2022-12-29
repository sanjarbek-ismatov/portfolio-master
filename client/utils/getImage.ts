import { portfolio } from "types/portfolio";
import { serverUrl } from "./serverUrl";
const url = serverUrl();
export const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
export async function fetchAndSendByUrl(data: portfolio[]) {
  const array: string[] = [];
  data.map(async (e, i) => {
    getBase64FromUrl(`${url}/image/${e.images[0]}`).then((data: any) =>
      array.push(data)
    );
  });
  return array;
}
