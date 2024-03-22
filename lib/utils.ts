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
