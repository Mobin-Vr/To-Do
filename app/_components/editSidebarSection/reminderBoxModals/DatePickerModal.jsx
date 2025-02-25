import { useState } from "react";

import CancelSaveBtn from "../../_ui/CancelSaveBtn";
import DatePicker from "../../_ui/DatePicker";

export default function DatePickerModal({
  task,
  toggleModal,
  setTaskDueDate,
  updateTaskInStore,
  isForTaskInput = false,
}) {
  const d = task?.dueDate ? new Date(task.dueDat) : "";
  const [date, setDate] = useState(d);

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
