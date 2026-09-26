export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeEveryWord(str) {
  if (!str) return "";
  return str.split(" ").map(capitalize).join(" ");
}