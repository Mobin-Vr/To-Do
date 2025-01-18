import { delay, getRelativeDay, getTimeAgo } from '@/app/_lib/utils';
import { TrashIcon } from '@/public/icons';
import { useEffect } from 'react';

export default function ActionFooter({
   task,
   toggleEditSidebar,
   setActiveTaskId,
   deleteTaskFromStore,
}) {
   const timeAgoCreated = getTimeAgo(task.createdAt);
   const timeAgoCompleted = getTimeAgo(task.completedAt);

   let ActionFooterText = task.isCompleted
      ? `Completed ${timeAgoCompleted}`
      : `Created ${timeAgoCreated}`;

   async function handleDelete() {
      // 1. close side bar
      toggleEditSidebar();
      await delay(200);

      // 2. set activeTaskId to null
      setActiveTaskId(null);

      // 3. Delete the task
      deleteTaskFromStore(task.id);
   }

   return (
      <div className='flex items-center gap-4 h-9 border border-t-1 border-gray-200 text-gray-700 p-3 font-light justify-between relative'>
         <span className='w-full text-center text-xs'>{ActionFooterText}</span>

         <button
            onClick={handleDelete}
            className='absolute right-0 h-full aspect-square flex justify-center items-center hover:bg-accent-200 rounded-sm transition-all duration-300'
         >
            <TrashIcon size='20px' />
         </button>
      </div>
   );
}
