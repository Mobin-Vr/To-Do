import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

// Route background color settings
export const BG_COLORS = {
   '/': '#e7ecf0',
   '/tasks': '#065F46',
   '/all': '#991B1B',
};
