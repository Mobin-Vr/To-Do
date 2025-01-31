import { BellIcon, CalendarIcon, NoteIcon, RefreshCw } from '@/public/icons';

function TaskDetails({ task }) {
   const cond =
      task.task_reminder || task.task_due_date || task.task_repeat
         ? true
         : false;

   return (
      <div className='font-light flex items-center gap-2.5 text-xs text-gray-800'>
         <span>Tasks</span>
         <div className='flex items-center gap-2'>
            {cond && <span className='h-1 w-1 bg-gray-400 mr-0.5'></span>}

            {task.task_reminder && (
               <span>
                  <BellIcon size='12px' color='#888' />
               </span>
            )}

            {task.task_due_date && (
               <span className='flex gap-0.5 items-center'>
                  <CalendarIcon size='12px' />
               </span>
            )}

            {task.task_repeat && (
               <span>
                  <RefreshCw size='12px' />
               </span>
            )}

            {task.task_note && (
               <span>
                  <NoteIcon size='12px' color='#888' />
               </span>
            )}

            {/* LATER for attach file {task.task_reminder && (
               <span>
                  <BellIcon size='12px' color='#888' />
               </span>
            )} */}
         </div>
      </div>
   );
}

export default TaskDetails;
