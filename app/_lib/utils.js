import { clsx } from "clsx";
import {
  addDays,
  addHours,
  formatDistanceToNow,
  isBefore,
  isPast,
  isSameDay,
  isToday,
  isTomorrow,
  roundToNearestMinutes,
  startOfDay,
} from "date-fns";

import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

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
export function getRoundedTime(mode = "today") {
  const now = new Date();

  let adjustedDate =
    mode === "nextWeek"
      ? addDays(now, 7) // Next week
      : mode === "tomorrow"
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
  //  const date = parseISO(inputDate);
  const date = new Date(inputDate);

  const dayOfWeek = date.getDay();

  // Check if the date falls on a weekday
  if (dayOfWeek >= 1 && dayOfWeek <= 5) return inputDate;

  // If it's a weekend, find the previous Friday
  const daysToSubtract = dayOfWeek === 0 ? 2 : 1; // Sunday -> subtract 2, Saturday -> subtract 1
  const previousFriday = addDays(date, -daysToSubtract);

  return previousFriday.toISOString();
}

export function isWeekday(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5;
}

export function getRelativeDay(date) {
  const today = startOfDay(new Date());
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);

  if (isSameDay(date, today)) {
    return "Today";
  } else if (isSameDay(date, tomorrow)) {
    return "Tomorrow";
  } else if (isSameDay(date, yesterday)) {
    return "Yesterday";
  }

  return null;
}

export function sortTasks(tasks, sortOption) {
  switch (sortOption) {
    case "importance":
      return [...tasks].sort((a, b) => b.is_task_starred - a.is_task_starred);

    case "dueDate":
      return [...tasks].sort((a, b) => {
        if (!a.task_due_date) return 1; // If no due date, push to the end
        if (!b.task_due_date) return -1;
        return new Date(a.task_due_date) - new Date(b.task_due_date);
      });

    case "alphabet":
      return [...tasks].sort((a, b) =>
        a.task_title.localeCompare(b.task_title, undefined, {
          sensitivity: "base",
        }),
      );

    case "creationDate":
      return [...tasks].sort(
        (a, b) => new Date(a.task_created_at) - new Date(b.task_created_at),
      );

    default:
      return tasks; // If no sort option matches, return as-is
  }
}

// It make a string (HH:MM) base on date
export function getHourMinString(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Function to replace time in an ISO date with new hours and minutes
export function replaceTimeInIsoDate(inputDate, timeString) {
  const [hours, minutes] = timeString.split(":");

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

  return date.toISOString();
}

export function getFormattedDate() {
  const options = { weekday: "long", month: "long", day: "numeric" };

  return new Date().toLocaleDateString("en-US", options);
}

export function getShortFormattedDate() {
  const options = { weekday: "short", month: "short", day: "numeric" };

  return new Date().toLocaleDateString("en-US", options);
}

// Calculates the next date based on the repeat type.
export function calculateNextDate(taskDueDate, repeatType) {
  let newDate = new Date(taskDueDate);

  switch (repeatType) {
    case "Daily":
      newDate.setDate(newDate.getDate() + 1); // Adds one day
      break;
    case "Weekdays":
      newDate.setDate(newDate.getDate() + 7); // Adds one week
      break;
    case "Weekly":
      newDate.setDate(newDate.getDate() + 7); // Adds one week
      break;
    case "Monthly":
      newDate.setMonth(newDate.getMonth() + 1); // Adds one month
      break;
    case "Yearly":
      newDate.setFullYear(newDate.getFullYear() + 1); // Adds one year
      break;
    default:
      break;
  }

  return newDate.toISOString();
}

// Check if the given date is before today (yesterday or earlier).
export function isDateBeforeToday(dateString) {
  const givenDate = startOfDay(new Date(dateString));
  const today = startOfDay(new Date());
  return isBefore(givenDate, today);
}

export function categorizePlannedTasks(tasks) {
  const today = new Date();

  const pastTasks = [];
  const todayTasks = [];
  const futureTasks = [];

  tasks.forEach((task) => {
    const dueDate = task.task_due_date ? task.task_due_date : null;

    const reminderDate = task.task_reminder ? task.task_reminder : null;

    const isTaskForToday =
      (dueDate && isToday(dueDate)) ||
      (reminderDate && isToday(reminderDate)) ||
      task.is_task_in_myday;

    if (isTaskForToday) todayTasks.push(task);
    else if (
      (dueDate && isBefore(dueDate, today)) ||
      (reminderDate && isBefore(reminderDate, today))
    )
      pastTasks.push(task);
    else futureTasks.push(task);
  });

  return { pastTasks, todayTasks, futureTasks };
}

export function checkIfToday(date) {
  return isToday(new Date(date));
}

export function checkIfTomorrow(date) {
  return isTomorrow(new Date(date));
}

export function hasDatePassed(dateString) {
  return isPast(new Date(dateString));
}

export function getInvitationLink(token) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL;

  console.log("Generated baseUrl:", baseUrl);

  const invitationLink = `${baseUrl}/tasks/invite?token=${token}`;

  return invitationLink;
}
