import { clsx } from 'clsx';
import {
   addDays,
   addHours,
   formatDistanceToNow,
   isSameDay,
   parseISO,
   roundToNearestMinutes,
   startOfDay,
} from 'date-fns';

import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

export function getTimeAgo(fromDate) {
   return formatDistanceToNow(new Date(fromDate).toISOString(), {
      addSuffix: true,
   });
}

export function generateNewUuid() {
   return uuidv4();
}

// Produce a delay
export function delay(ms) {
   // eslint-disable-next-line no-undef
   return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getDateNowIso() {
   return new Date().toISOString();
}

/* Returns a rounded time based on the specified mode (today, tomorrow, or next week), ensuring the time is not in the midnight range (00:00 to 07:00). */
export function getRoundedTime(mode = 'today') {
   const now = new Date();

   let adjustedDate =
      mode === 'nextWeek'
         ? addDays(now, 7) // Next week
         : mode === 'tomorrow'
         ? addHours(now, 24) // Tomorrow
         : addHours(now, 3); // Today (default)

   // Round the time to the nearest 30 minutes
   let roundedTime = roundToNearestMinutes(adjustedDate, { nearestTo: 30 });

   // Ensure the time is not in the midnight range (00:00 to 07:00)
   if (roundedTime.getHours() >= 0 && roundedTime.getHours() < 7) {
      roundedTime.setHours(7, 0, 0, 0); // Set time to 07:00
   }

   return roundedTime;
}

// Returns the input date if it's a weekday, otherwise returns the previous Friday.
export function getWeekendForWeekdays(inputDate) {
   // Parse the ISO date format
   const date = parseISO(inputDate);
   const dayOfWeek = date.getDay();

   // Check if the date falls on a weekday
   if (dayOfWeek >= 1 && dayOfWeek <= 5) return inputDate;

   // If it's a weekend, find the previous Friday
   const daysToSubtract = dayOfWeek === 0 ? 2 : 1; // Sunday -> subtract 2, Saturday -> subtract 1
   const previousFriday = addDays(date, -daysToSubtract);

   return previousFriday.toISOString();
}

export function isWeekday(dateString) {
   const date = parseISO(dateString);
   const dayOfWeek = date.getDay();
   return dayOfWeek >= 1 && dayOfWeek <= 5;
}

export function getRelativeDay(date) {
   const today = startOfDay(new Date());
   const yesterday = addDays(today, -1);
   const tomorrow = addDays(today, 1);

   if (isSameDay(date, today)) {
      return 'Today';
   } else if (isSameDay(date, tomorrow)) {
      return 'Tomorrow';
   } else if (isSameDay(date, yesterday)) {
      return 'Yesterday';
   }

   return null;
}

export function sortTasks(tasks, sortOption) {
   switch (sortOption) {
      case 'importance':
         return [...tasks].sort(
            (a, b) => b.is_task_starred - a.is_task_starred
         );

      case 'dueDate':
         return [...tasks].sort((a, b) => {
            if (!a.task_due_date) return 1; // If no due date, push to the end
            if (!b.task_due_date) return -1;
            return new Date(a.task_due_date) - new Date(b.task_due_date);
         });

      case 'alphabet':
         return [...tasks].sort((a, b) =>
            a.task_title.localeCompare(b.task_title, undefined, {
               sensitivity: 'base',
            })
         );

      case 'creationDate':
         return [...tasks].sort(
            (a, b) => new Date(a.task_created_at) - new Date(b.task_created_at)
         );

      default:
         return tasks; // If no sort option matches, return as-is
   }
}

// It make a string (HH:MM) base on date
export function getHourMinString(date) {
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   return `${hours}:${minutes}`;
}

// Function to replace time in an ISO date with new hours and minutes
export function replaceTimeInIsoDate(inputDate, timeString) {
   const [hours, minutes] = timeString.split(':');

   const year = inputDate.getFullYear();
   const month = String(inputDate.getMonth() + 1).padStart(2, '0');
   const day = String(inputDate.getDate()).padStart(2, '0');

   const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

   return date.toISOString();
}

// Route background color settings
// [ 0  , 1   ,  2     , 3   , 4  ]
// [bg1, bg2, bg-hover, txt1, txt2]

export const BG_COLORS = {
   '/slug': ['#dfedf9', '#f6f6f6', '#fbfbfb', '#3063ab  ', '#6B7280 '],
   '/tasks': ['#dfedf9', '#f6f6f6', '#fbfbfb', '#3063ab  ', '#6B7280 '],
   '/all': ['#c4514c', '#f6f6f6', '#6b7280', '#fff', '#fff'],
};

export const DEFAULT_COLOR = {
   blue: '#286fd4',
   current: '#586570',
};

// Timer interval (in seconds) for checking the database connection health
export const HEALTH_CHECK_TIMER = 300;

export const defaultCategoryId = '00000000-0000-0000-0000-000000000000';
export const defaultCategory = {
   category_id: defaultCategoryId,
   category_title: 'default',
   category_owner_id: null,
   category_created_at: null,
   has_category_collaborator: false,
   has_category_invatation: false,
};
