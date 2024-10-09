export function formatDate(timestampInSeconds: number): string {
  const date = new Date(timestampInSeconds * 1000);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return (
    year +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day
  );
}

export function formatDateTime(timestampInSeconds: number): string {
  const date = new Date(timestampInSeconds * 1000);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  return (
    year +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day +
    " " +
    (hour < 10 ? "0" : "") +
    hour +
    ":" +
    (min < 10 ? "0" : "") +
    min +
    ":" +
    (sec < 10 ? "0" : "") +
    sec
  );
}

export function getRandomId() {
  return Math.floor(Math.random() * 1_000_000_000);
}
