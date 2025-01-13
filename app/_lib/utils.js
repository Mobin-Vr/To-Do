import { clsx } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

export function getTimeAgo(fromDate) {
   return formatDistanceToNow(new Date(fromDate), { addSuffix: true });
}

// Route background color settings
// [ 0  , 1   ,  2     , 3   , 4  ]
// [bg1, bg2, bg-hover, txt1, txt2]

export const BG_COLORS = {
   '/': ['#e7ecf0', '#f6f6f6', '#fbfbfb', '#4B5563  ', '#6B7280 '],
   '/tasks': ['#df14', '#f6f6f6', '#6b7280', '#fff', '#fff'],
   '/all': ['#c4514c', '#f6f6f6', '#6b7280', '#fff', '#fff'],
};

// Timer interval (in seconds) for checking the database connection health
export const HEALTH_CHECK_TIMER = 30;
