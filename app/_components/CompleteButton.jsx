import { CircleIcon, CompletedIcon, TickCircleIcon } from '@/public/icons';
import useTaskStore from '../store';

export default function CompleteButton({ task, compBtnRef, className }) {
   const toggleCompletedInStore = useTaskStore(
      (state) => state.toggleCompletedInStore
   );

   return (
      <button
         ref={compBtnRef}
         onClick={() => toggleCompletedInStore(task.id)}
         className={`group bg-transparent relative transition-all cursor-default duration-300 ease-in-out ${className} ${
            task.isCompleted
               ? 'line-through text-gray-300 decoration-gray-300 decoration-2'
               : ''
         }`}
      >
         {task.isCompleted ? (
            <CompletedIcon />
         ) : (
            <>
               <span className='block group-hover:hidden'>
                  <CircleIcon />
               </span>

               <span className='hidden group-hover:block'>
                  <TickCircleIcon />
               </span>
            </>
         )}
      </button>
   );
}
