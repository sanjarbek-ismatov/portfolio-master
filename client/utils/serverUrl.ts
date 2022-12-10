export function serverUrl() {
  var url: string = process.env.SERVER_URL || "";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:4000";
  }
  return url;
}
