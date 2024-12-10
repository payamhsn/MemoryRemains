export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getTimeDifference = (date1, date2) => {
  const diff = Math.abs(new Date(date1) - new Date(date2));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  let result = [];
  if (days > 0) result.push(`${days} Day${days > 1 ? "s" : ""}`);
  if (hours > 0) result.push(`${hours} Hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) result.push(`${minutes} Minute${minutes > 1 ? "s" : ""}`);

  if (result.length === 0) return "Less than a minute";
  if (result.length === 1) return result[0];
  if (result.length === 2) return result.join(" and ");
  return result.slice(0, -1).join(", ") + ", and " + result.slice(-1);
};
