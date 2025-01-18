import {
   getRoundedTime,
   getWeekendForWeekdays,
   isWeekday,
} from '@/app/_lib/utils';
import useTaskStore from '@/app/store';
import {
   DailyIcon,
   MonthlyIcon,
   WeekDaysIcon,
   WeeklyIcon,
   YearlyIcon,
} from '@/public/icons';
import { useShallow } from 'zustand/react/shallow';
import { ModalActionButton } from './ModalActionBtn';

export default function AddRepeatModal({ updateRepeat, updateDueDate, task }) {
   // Update store (id, repeat)
   function handleSelect(period) {
      updateRepeat(task.id, period);

      // for some bug fixes of clicking again on weekdays (repeat) and update the due date if its not a weekday
      if (task.repeat === 'Weekdays' && !isWeekday(task.dueDate)) {
         const nearestFridy = getWeekendForWeekdays(task.dueDate);
         updateDueDate(task.id, nearestFridy);
      }
   }

   return (
      <>
         <ModalActionButton
            icon={<DailyIcon />}
            label='Daily'
            time={null}
            onClick={() => handleSelect('Daily')}
         />

         <ModalActionButton
            icon={<WeekDaysIcon />}
            label='Weekdays'
            time={null}
            onClick={() => handleSelect('Weekdays')}
         />

         <ModalActionButton
            icon={<WeeklyIcon />}
            label='Weekly'
            time={null}
            onClick={() => handleSelect('Weekly')}
         />

         <ModalActionButton
            icon={<MonthlyIcon />}
            label='Monthly'
            time={null}
            onClick={() => handleSelect('Monthly')}
         />

         <ModalActionButton
            icon={<YearlyIcon />}
            label='Yearly'
            time={null}
            onClick={() => handleSelect('Yearly')}
         />
      </>
   );
}
