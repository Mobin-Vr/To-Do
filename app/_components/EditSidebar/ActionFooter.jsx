import { getTimeAgo } from '@/app/_lib/utils';
import { TrashIcon } from '@/public/icons';

export default function ActionFooter({ task, ActionFooterRef }) {
   const timeAgo = getTimeAgo(task.createdAt);

   return (
      <div
         ref={ActionFooterRef}
         className='flex items-center gap-4 h-9 border border-t-1 border-gray-200 text-gray-700 p-3 font-light justify-between relative'
      >
         <span className='w-full text-center text-xs'>Created {timeAgo}</span>

         <button className='absolute right-0 h-full aspect-square flex justify-center items-center hover:bg-accent-200 rounded-sm transition-all duration-300'>
            <TrashIcon size='20px' />
         </button>
      </div>
   );
}
