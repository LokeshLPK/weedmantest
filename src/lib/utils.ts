import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string | number | Date): string => {
  if (!date) {
    throw new Error("Invalid date value");
  }

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  try {
    return formatter.format(new Date(date));
  } catch (error) {
    throw new Error(`Failed to format date: ${error}`);
  }
};
