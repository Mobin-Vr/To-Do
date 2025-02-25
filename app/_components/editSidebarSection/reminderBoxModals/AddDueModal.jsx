import { getRoundedTime } from "@/app/_lib/utils";
import {
  NextWeekCalendarIcon,
  PeakCalendarIcon,
  TodayCalendarIcon,
  TomorrowCalendarIcon,
} from "@/public/icons/icons";
import { format } from "date-fns";
import { ModalActionButton } from "./ModalActionBtn";

export default function AddDueModal({
  task,
  toggleModal,
  setTaskDueDate,
  updateTaskInStore,
  isForTaskInput = false,
}) {
  const today = getRoundedTime("today");
  const tomorrow = getRoundedTime("tomorrow");
  const nextWeek = getRoundedTime("nextWeek");

  // update store (id, dueDate)
  function handleSelect(day) {
    if (!isForTaskInput)
      updateTaskInStore(task.task_id, { task_due_date: day });

    if (isForTaskInput) setTaskDueDate(day);
  }

  return (
    <>
      <ModalActionButton
        icon={<TodayCalendarIcon />}
        label="Today"
        time={format(today, "EEE")}
        onClick={() => handleSelect(today)}
      />

      <ModalActionButton
        icon={<TomorrowCalendarIcon />}
        label="Tomorrow"
        time={format(tomorrow, "EEE")}
        onClick={() => handleSelect(tomorrow)}
      />

      <ModalActionButton
        icon={<NextWeekCalendarIcon />}
        label="Next week"
        time={format(nextWeek, "EEE")}
        className="border-b border-gray-100"
        onClick={() => handleSelect(nextWeek)}
      />

      <ModalActionButton
        icon={<PeakCalendarIcon />}
        label="Pick a date"
        onClick={() => toggleModal()}
      />
    </>
  );
}
