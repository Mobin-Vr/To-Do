import { getRoundedTime } from '@/app/_lib/utils';
import {
   TimerCalendarIcon,
   TodayClockIcon,
   TomorrowClockIcon,
} from '@/public/icons';
import { format, isSameDay } from 'date-fns';
import { ModalActionButton } from './ModalActionBtn';

export default function AddReminderModal({ updateReminder, task }) {
   const today = isSameDay(new Date(), getRoundedTime('today'))
      ? getRoundedTime('today')
      : null;

   const tomorrow = getRoundedTime('tomorrow');

   // update store (id, reminder)
   const handleSelect = (day) => {
      updateReminder(task.id, day.toISOString());
   };

   return (
      <>
         <ModalActionButton
            icon={<TodayClockIcon size='14px' />}
            label='Later Today'
            time={format(today, 'HH:mm')}
            disabled={today ? false : true}
            onClick={() => handleSelect(today)}
         />

         <ModalActionButton
            icon={<TomorrowClockIcon size='14px' />}
            label='Tomorrow'
            time={format(tomorrow, 'HH:mm')}
            className='border-b border-gray-100'
            onClick={() => handleSelect(tomorrow)}
         />

         <ModalActionButton
            icon={<TimerCalendarIcon size='14px' />}
            label='Pick a date & time'
            className=''
         />
      </>
   );
}
