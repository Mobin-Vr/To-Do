import { delay, getTimeAgo } from '@/app/_lib/utils';
import DeleteBtn from '../_ui/DeleteBtn';

export default function ActionFooter({
   task,
   toggleEditSidebar,
   deleteTaskFromStore,
}) {
   if (!task.task_created_at) return;

   const timeAgoCreated = getTimeAgo(task.task_created_at);
   const timeAgoCompleted = getTimeAgo(task.task_completed_at);

   let ActionFooterText = task.is_task_completed
      ? `Completed ${timeAgoCompleted}`
      : `Created ${timeAgoCreated}`;

   async function handleDelete() {
      // 1. close side bar
      toggleEditSidebar();
      await delay(200);

      // 2. Delete the task
      deleteTaskFromStore(task.task_id);
   }

   return (
      <div className='flex items-center gap-4 h-12 border border-t-1 border-gray-200 text-gray-700 p-3 font-light justify-between relative'>
         <span className='w-full text-center text-[0.8rem]'>
            {ActionFooterText}
         </span>

         <DeleteBtn
            onClick={handleDelete}
            className='absolute right-0 h-full aspect-square flex justify-center items-center hover:bg-accent-200 rounded-md transition-all duration-300'
         />
      </div>
   );
}
