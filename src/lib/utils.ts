import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function strToNum(str: string): number {
  return Number(str.replace(/,/g, ""));
}

export function formattedNum(num: number): string {
  return num.toLocaleString();
}
