import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateWords(text: string, wordLimit = 35) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= wordLimit) return text.trim();
  return `${words.slice(0, wordLimit).join(" ")}...`;
}
