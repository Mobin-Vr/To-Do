import { getWeekendForWeekdays, isWeekday } from "@/app/_lib/utils";
import {
  DailyIcon,
  MonthlyIcon,
  WeekDaysIcon,
  WeeklyIcon,
  YearlyIcon,
} from "@/public/icons/icons";
import { ModalActionButton } from "./ModalActionBtn";

export default function AddRepeatModal({
  task,
  taskDueDate,
  taskRepeat,
  setTaskDueDate,
  selectedRepeat,
  updateTaskInStore,
  setTaskRepeat,
  isForTaskInput = false,
}) {
  // Update store (id, repeat)
  function handleSelect(period) {
    if (!isForTaskInput) {
      const nearestFriday = getWeekendForWeekdays(task.task_due_date);
      updateTaskInStore(task.task_id, { task_repeat: period });

      if (task.task_repeat === "Weekdays" && !isWeekday(task.task_due_date))
        updateTaskInStore(task.task_id, { task_due_date: nearestFriday }); // for some bug fixes of clicking again on weekdays (repeat) and update the due date if its not a weekday
    }

    if (isForTaskInput) {
      const nearestFriday = getWeekendForWeekdays(taskDueDate);
      setTaskRepeat(period);

      if (taskRepeat === "Weekdays" && !isWeekday(taskDueDate))
        setTaskDueDate(nearestFriday);
    }
  }

  return (
    <>
      <ModalActionButton
        icon={<DailyIcon />}
        label="Daily"
        time={null}
        onClick={() => handleSelect("Daily")}
        className={`${selectedRepeat === "Daily" ? "bg-gray-900 text-white hover:bg-gray-900" : ""}`}
      />

      <ModalActionButton
        icon={<WeekDaysIcon />}
        label="Weekdays"
        time={null}
        onClick={() => handleSelect("Weekdays")}
        className={`${selectedRepeat === "Weekdays" ? "bg-gray-900 text-white hover:bg-gray-900" : ""}`}
      />

      <ModalActionButton
        icon={<WeeklyIcon />}
        label="Weekly"
        time={null}
        onClick={() => handleSelect("Weekly")}
        className={`${selectedRepeat === "Weekly" ? "bg-gray-900 text-white hover:bg-gray-900" : ""}`}
      />

      <ModalActionButton
        icon={<MonthlyIcon />}
        label="Monthly"
        time={null}
        onClick={() => handleSelect("Monthly")}
        className={`${selectedRepeat === "Monthly" ? "bg-gray-900 text-white hover:bg-gray-900" : ""}`}
      />

      <ModalActionButton
        icon={<YearlyIcon />}
        label="Yearly"
        time={null}
        onClick={() => handleSelect("Yearly")}
        className={`${selectedRepeat === "Yearly" ? "bg-gray-900 text-white hover:bg-gray-900" : ""}`}
      />
    </>
  );
}
