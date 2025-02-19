import {
  BellIcon,
  DateIcon,
  NoteIcon,
  SunIcon,
  SyncIcon,
} from "@/public/icons";
import { defaultCategoryId } from "../_lib/configs";
import {
  checkIfToday,
  checkIfTomorrow,
  getShortFormattedDate,
  hasDatePassed,
} from "../_lib/utils";

function TaskDetails({ task, listName, className }) {
  let text = "";

  if (task.task_category_id !== defaultCategoryId) {
    text = [
      "My Day",
      "Important",
      "Planned",
      "All",
      "Completed",
      "Tasks",
    ].includes(listName)
      ? (task.task_category_title ?? "Unknown")
      : "";
  }
  //
  else {
    if (listName === "My Day") text = "Tasks";
    else if (task.is_task_in_myday)
      text = (
        <span className="flex items-center gap-0.5">
          <SunIcon size="14" /> My Day
        </span>
      );
    else text = "Tasks";
  }

  const cond_1 = task.task_reminder || task.task_due_date || task.task_repeat;
  const cond_2 = [
    "My Day",
    "Important",
    "Planned",
    "All",
    "Completed",
    "Tasks",
  ].includes(listName)
    ? cond_1
    : false;

  return (
    <div
      className={`flex items-center gap-2.5 text-xs font-light text-gray-400 ${className}`}
    >
      {text !== "" && <span>{text}</span>}

      <div className="flex items-center gap-2">
        {cond_2 && <span className="mr-0.5 h-1 w-1 bg-gray-400"></span>}

        {task.task_reminder && (
          <span className="flex items-center gap-0.5">
            <BellIcon size="12px" color="#888" />
            {checkIfToday(task.task_reminder)
              ? "Today"
              : checkIfTomorrow(task.task_reminder)
                ? "Tomorrow"
                : getShortFormattedDate(task.task_reminder)}
          </span>
        )}

        {task.task_due_date &&
          (hasDatePassed(task.task_due_date) ? (
            <span className="flex items-center gap-0.5 text-red-600">
              <DateIcon size="12px" /> Overdue
            </span>
          ) : (
            <span
              className={`flex items-center gap-0.5 ${
                checkIfToday(task.task_due_date) ? "text-blue-600" : ""
              }`}
            >
              <DateIcon size="12px" />
              {checkIfToday(task.task_due_date)
                ? "Today"
                : checkIfTomorrow(task.task_due_date)
                  ? "Tomorrow"
                  : getShortFormattedDate(task.task_due_date)}
            </span>
          ))}

        {task.task_repeat && (
          <span className="mt-0.5">
            <SyncIcon size="13px" />
          </span>
        )}

        {task.task_note && (
          <span>
            <NoteIcon size="12px" color="#888" />
          </span>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;
