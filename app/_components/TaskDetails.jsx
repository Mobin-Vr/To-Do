import { BellIcon, CalendarIcon, NoteIcon, RefreshCw } from '@/public/icons';
import { getRelativeDay } from '../_lib/utils';

function TaskDetails({ task }) {
   const cond = task.reminder || task.dueDate || task.repeat ? true : false;

   return (
      <div className='font-light flex items-center gap-2.5 text-xs text-gray-800'>
         <span>Tasks</span>
         <div className='flex items-center gap-2'>
            {cond && <span className='h-1 w-1 bg-gray-400 mr-0.5'></span>}

            {task.reminder && (
               <span>
                  <BellIcon size='12px' color='#888' />
               </span>
            )}

            {task.dueDate && (
               <span className='flex gap-0.5 items-center'>
                  <CalendarIcon size='12px' />
               </span>
            )}

            {task.repeat && (
               <span>
                  <RefreshCw size='12px' />
               </span>
            )}

            {task.note && (
               <span>
                  <NoteIcon size='12px' color='#888' />
               </span>
            )}

            {/* LATER for attach file {task.reminder && (
               <span>
                  <BellIcon size='12px' color='#888' />
               </span>
            )} */}
         </div>
      </div>
   );
}

export default TaskDetails;
