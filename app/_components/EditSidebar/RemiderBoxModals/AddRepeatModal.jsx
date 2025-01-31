import { getWeekendForWeekdays, isWeekday } from '@/app/_lib/utils';
import {
   DailyIcon,
   MonthlyIcon,
   WeekDaysIcon,
   WeeklyIcon,
   YearlyIcon,
} from '@/public/icons';
import { ModalActionButton } from './ModalActionBtn';

export default function AddRepeatModal({
   updateRepeat,
   updateDueDate,
   task,
   isForTaskInput = false,
   taskDueDate,
   taskRepeat,
}) {
   // Update store (id, repeat)
   function handleSelect(period) {
      if (!isForTaskInput) {
         console.log('nearest: ', task.task_due_date);

         const nearestFriday = getWeekendForWeekdays(task.task_due_date);
         updateRepeat(task.task_id, period);

         if (task.task_repeat === 'Weekdays' && !isWeekday(task.task_due_date))
            updateDueDate(task.task_id, nearestFriday);
      }

      if (isForTaskInput) {
         const nearestFriday = getWeekendForWeekdays(taskDueDate);
         updateRepeat(period);

         if (taskRepeat === 'Weekdays' && !isWeekday(taskDueDate))
            updateDueDate(nearestFriday);
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
