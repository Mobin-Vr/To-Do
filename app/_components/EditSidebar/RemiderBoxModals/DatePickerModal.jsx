import { useState } from 'react';

import CancelSaveBtn from '../../_ui/CancelSaveBtn';
import DatePicker from '../../_ui/DatePicker';

export default function DatePickerModal({
   updateDueDate,
   toggleModal,
   task,
   isForTaskInput = false,
}) {
   const d = task?.dueDate ? new Date(task.dueDat) : '';
   const [date, setDate] = useState(d);

   function hanldeSave() {
      const due = date.toISOString();
      if (!isForTaskInput) updateDueDate(task.id, due);
      if (isForTaskInput) updateDueDate(due);
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
