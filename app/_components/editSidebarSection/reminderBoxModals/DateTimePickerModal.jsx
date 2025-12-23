import { getHourMinString, replaceTimeInIsoDate } from "@/app/_lib/utils";
import { useRef, useState } from "react";

import CancelSaveBtn from "../../_ui/CancelSaveBtn";
import DatePicker from "../../_ui/DatePicker";
import TimePicker from "../../_ui/TimePicker";

export default function DateTimePickerModal({
  task,
  updateTaskInStore,
  toggleModal,
  setTaskReminder,
  InputSelectedDate,
  isForTaskInput = false,
}) {
  const d = task
    ? task.task_reminder
      ? new Date(task.task_reminder) // use existing reminder date
      : new Date() // default to now if no reminder set (avoid undefined error)
    : new Date(InputSelectedDate); // use selected date from input

  const t = task
    ? task.task_reminder
      ? getHourMinString(new Date(task.task_reminder))
      : getHourMinString(new Date())
    : getHourMinString(new Date(InputSelectedDate));

  const timeInputRef = useRef(null);
  const [date, setDate] = useState(d);
  const [time, setTime] = useState(t);

  const handleInputClick = () => {
    if (timeInputRef.current) timeInputRef.current.showPicker();
  };

  function hanldeSave() {
    const due = replaceTimeInIsoDate(date, time);
    if (!isForTaskInput)
      updateTaskInStore(task.task_id, { task_reminder: due });

    if (isForTaskInput) setTaskReminder(due);
    toggleModal();
  }

  function hanldeCancel() {
    toggleModal();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <DatePicker date={date} setDate={setDate} />

      <TimePicker
        timeInputRef={timeInputRef}
        handleInputClick={handleInputClick}
        setTime={setTime}
        time={time}
      />

      <CancelSaveBtn hanldeCancel={hanldeCancel} hanldeSave={hanldeSave} />
    </div>
  );
}
