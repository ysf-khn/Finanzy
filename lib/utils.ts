import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (): string => {
  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: "long" });

  const ordinalSuffix = getOrdinalSuffix(date);

  return `${day}, ${month} ${date}${ordinalSuffix}`;
};

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  const unitsDigit = day % 10;
  switch (unitsDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatNumberWithCommas(number: number): string {
  // Use toLocaleString for comma separation (adjust options as needed)
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0, // Set to 2 for decimals (adjust as needed)
    maximumFractionDigits: 0, // Set to 2 for decimals (adjust as needed)
  });
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (seconds < 30) return "Just now";
  else if (minutes === 1) return `${minutes} minute ago`;
  else if (minutes < 60) return `${minutes} minutes ago`;
  else if (hours === 1) return `${hours} hour ago`;
  else if (hours < 24) return `${hours} hours ago`;
  else if (days === 1) return "Yesterday";
  else if (days < 7) return `${days} days ago`;
  else if (weeks === 1) return `${weeks} week ago`;
  else if (weeks < 52) return `${weeks} weeks ago`;
  else return `${years} years ago`;
}
