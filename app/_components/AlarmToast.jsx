import { BellIcon, TickCircleIcon } from '@/public/icons';
import OrdinaryBtn from './_ui/OrdinaryBtn';

export default function AlarmToast({
   task,
   t,
   toast,
   updateReminder,
   toggleCompleted,
   alarmSound,
   autoStopTimeout,
}) {
   return (
      <div
         className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
         } max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-100 p-3 flex flex-col items-center justify-center opacity-95 gap-4 w-full h-full`}
      >
         <div className='flex flex-col items-center'>
            <strong className='text-xs border-b-2 border-b-gray-500 mb-1.5'>
               Reminder
            </strong>

            <p className='text-sm text-center font-light'>{task.task_title}</p>
         </div>

         <div className='flex gap-2 w-full px-3 max-w-fit'>
            <OrdinaryBtn
               text='Snooze'
               mode='toast'
               className='flex-1 w-[6.5rem]'
               onClick={() => {
                  clearTimeout(autoStopTimeout);
                  alarmSound.loop = false;
                  alarmSound.pause();
                  alarmSound.currentTime = 0;
                  toast.dismiss(t.id);

                  // Add new reminder 5 minutes later
                  const newReminderTime = new Date(
                     Date.now() + 5 * 60 * 1000
                  ).toISOString();
                  updateReminder(task.task_id, newReminderTime);
               }}
            >
               <BellIcon size='15' />
            </OrdinaryBtn>

            <OrdinaryBtn
               text='Complete'
               mode='toast'
               className='flex-1 w-[6.5rem]'
               onClick={() => {
                  clearTimeout(autoStopTimeout);
                  alarmSound.loop = false;
                  alarmSound.pause();
                  alarmSound.currentTime = 0;
                  toast.dismiss(t.id);
                  toggleCompleted(task.task_id);
               }}
            >
               <TickCircleIcon size='15' />
            </OrdinaryBtn>
         </div>
      </div>
   );
}
