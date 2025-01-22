import { getRoundedTime } from '@/app/_lib/utils';
import {
   NextWeekCalendarIcon,
   PeakCalendarIcon,
   TodayCalendarIcon,
   TomorrowCalendarIcon,
} from '@/public/icons';
import { format } from 'date-fns';
import { ModalActionButton } from './ModalActionBtn';

export default function AddDueModal({
   updateDueDate,
   task,
   isForTaskInput = false,
   toggleModal,
}) {
   const today = getRoundedTime('today');
   const tomorrow = getRoundedTime('tomorrow');
   const nextWeek = getRoundedTime('nextWeek');

   // update store (id, dueDate)
   function handleSelect(day) {
      if (!isForTaskInput) updateDueDate(task.id, day);
      if (isForTaskInput) updateDueDate(day);
   }

   return (
      <>
         <ModalActionButton
            icon={<TodayCalendarIcon size='16px' />}
            label='Today'
            time={format(today, 'EEE')}
            onClick={() => handleSelect(today)}
         />

         <ModalActionButton
            icon={<TomorrowCalendarIcon size='16px' />}
            label='Tomorrow'
            time={format(tomorrow, 'EEE')}
            onClick={() => handleSelect(tomorrow)}
         />

         <ModalActionButton
            icon={<NextWeekCalendarIcon size='16px' />}
            label='Next week'
            time={format(nextWeek, 'EEE')}
            className='border-b border-gray-100'
            onClick={() => handleSelect(nextWeek)}
         />

         <ModalActionButton
            icon={<PeakCalendarIcon size='16px' />}
            label='Pick a date'
            onClick={() => toggleModal()}
         />
      </>
   );
}
