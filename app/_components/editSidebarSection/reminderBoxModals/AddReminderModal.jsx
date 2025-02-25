import { getRoundedTime } from "@/app/_lib/utils";
import {
  PickReminderIcon,
  TodayReminderIcon,
  TomorrowReminderIcon,
} from "@/public/icons/icons";
import { format, isSameDay } from "date-fns";
import { ModalActionButton } from "./ModalActionBtn";

export default function AddReminderModal({
  updateTaskInStore,
  isForTaskInput = false,
  toggleModalDatePicker,
  task,
  setTaskReminder,
}) {
  const today = isSameDay(new Date(), getRoundedTime("today"))
    ? getRoundedTime("today")
    : null;

  const tomorrow = getRoundedTime("tomorrow");

  // update store (id, reminder)
  const handleSelect = (day) => {
    if (!isForTaskInput)
      updateTaskInStore(task.task_id, { task_reminder: day }); // for sidebar
    if (isForTaskInput) setTaskReminder(day); // for task input (just update the locale state before creating a task)
  };

  return (
    <>
      <ModalActionButton
        icon={<TodayReminderIcon />}
        label="Later Today"
        time={format(today, "HH:mm")}
        disabled={today ? false : true}
        onClick={() => handleSelect(today)}
      />

      <ModalActionButton
        icon={<TomorrowReminderIcon />}
        label="Tomorrow"
        time={format(tomorrow, "HH:mm")}
        className="border-b border-gray-100"
        onClick={() => handleSelect(tomorrow)}
      />

      <ModalActionButton
        icon={<PickReminderIcon />}
        label="Pick a date & time"
        className=""
        onClick={toggleModalDatePicker}
      />
    </>
  );
}
