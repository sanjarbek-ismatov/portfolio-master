export function subtractTime(date: string): string {
  let date1 = new Date();
  let date2 = new Date(date);
  let difference = date1.getTime() - date2.getTime();
  let hours = Math.floor(difference / (1000 * 60 * 60));
  let days = Math.floor(hours / 24);
  let minutes = Math.floor(difference / (1000 * 60)) % 60;
  let seconds = Math.floor(difference / 1000) % 60;
  if (days >= 1) return `${days} kun avval`;
  else if (hours >= 1) return `${hours} soat avval`;
  else if (minutes >= 1) return `${minutes}  minut avval`;
  return `${seconds} sekund avval`;
}
