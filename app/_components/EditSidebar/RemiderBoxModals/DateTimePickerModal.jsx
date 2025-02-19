import { getHourMinString, replaceTimeInIsoDate } from "@/app/_lib/utils";
import { useRef, useState } from "react";

import CancelSaveBtn from "../../_ui/CancelSaveBtn";
import DatePicker from "../../_ui/DatePicker";
import TimePicker from "../../_ui/TimePicker";

export default function DateTimePickerModal({
  updateReminder,
  toggleModal,
  task,
  isForTaskInput = false,
}) {
  const d = task?.reminder ? new Date(task.task_reminder) : new Date();
  const t = task?.reminder
    ? getHourMinString(new Date(task.task_reminder))
    : getHourMinString(new Date());

  const timeInputRef = useRef(null);
  const [date, setDate] = useState(d);
  const [time, setTime] = useState(t);

  const handleInputClick = () => {
    if (timeInputRef.current) timeInputRef.current.showPicker();
  };

  function hanldeSave() {
    const due = replaceTimeInIsoDate(date, time);
    if (!isForTaskInput) updateReminder(task.task_id, due);
    if (isForTaskInput) updateReminder(due);
    toggleModal();
  }

  function hanldeCancel() {
    toggleModal();
  }

  return (
    <div>
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
