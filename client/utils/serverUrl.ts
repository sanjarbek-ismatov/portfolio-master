export function serverUrl() {
  var url: string = process.env.SERVER_URL || "";
  if (process.env.NODE_ENV === "development") {
    url = "https://4000-sanjarbekis-portfolioma-7973vdcx17n.ws-us87.gitpod.io";
  } else if (process.env.NODE_ENV === "production") {
    url = "https://portfolio-master.onrender.com";
  }

  return url;
}
