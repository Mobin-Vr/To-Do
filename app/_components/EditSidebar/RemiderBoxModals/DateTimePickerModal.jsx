import { getHourMinString, replaceTimeInIsoDate } from '@/app/_lib/utils';
import { useRef, useState } from 'react';

import CancelSaveBtn from '../../_ui/CancelSaveBtn';
import DatePicker from '../../_ui/DatePicker';
import TimePicker from '../../_ui/TimePicker';

export default function DateTimePickerModal({
   updateReminder,
   toggleModal,
   task,
}) {
   const t = task.reminder ? getHourMinString(task.reminder) : '';

   const timeInputRef = useRef(null);
   const [date, setDate] = useState(new Date(task.reminder));
   const [time, setTime] = useState(t);

   const handleInputClick = () => {
      if (timeInputRef.current) timeInputRef.current.showPicker();
   };

   function hanldeSave() {
      const due = replaceTimeInIsoDate(date, time);
      updateReminder(task.id, due);
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
