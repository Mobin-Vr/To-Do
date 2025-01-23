import { useState } from 'react';

import CancelSaveBtn from '../../_ui/CancelSaveBtn';
import DatePicker from '../../_ui/DatePicker';

export default function DatePickerModal({ updateDueDate, toggleModal, task }) {
   const [date, setDate] = useState(new Date(task.dueDate));

   function hanldeSave() {
      const due = date.toISOString();
      updateDueDate(task.id, due);
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
