export function subtractTime(date: string) {
  let date1 = new Date();
  let date2 = new Date(date);
  let difference = date1.getTime() - date2.getTime();
  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor(difference / (1000 * 60)) % 60;
  let seconds = Math.floor(difference / 1000) % 60;
  let result = hours + ":" + minutes + ":" + seconds;
  console.log(result);
}
