import { useState } from "react";

import CancelSaveBtn from "../../_ui/CancelSaveBtn";
import DatePicker from "../../_ui/DatePicker";

export default function DatePickerModal({
  task,
  toggleModal,
  setTaskDueDate,
  InputSelectedDate,
  updateTaskInStore,
  isForTaskInput = false,
}) {
  const d = task
    ? task.task_due_date
      ? new Date(task.task_due_date)
      : ""
    : new Date(InputSelectedDate);

  const [date, setDate] = useState(d);

  console.log(date);

  function hanldeSave() {
    const due = date.toISOString();
    if (!isForTaskInput)
      updateTaskInStore(task.task_id, { task_due_date: due });

    if (isForTaskInput) setTaskDueDate(due);
    toggleModal();
  }

  function hanldeCancel() {
    toggleModal();
  }

  return (
    <div>
      <DatePicker date={date} setDate={setDate} />
      <CancelSaveBtn hanldeCancel={hanldeCancel} hanldeSave={hanldeSave} />
    </div>
  );
}
