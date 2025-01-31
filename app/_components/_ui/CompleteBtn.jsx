import { CircleIcon, CompletedIcon, TickCircleIcon } from '@/public/icons';
import useTaskStore from '../../taskStore';

export default function CompleteBtn({ task, compBtnRef, className }) {
   const toggleCompleted = useTaskStore((state) => state.toggleCompleted);
   return (
      <button
         ref={compBtnRef}
         onClick={() => toggleCompleted(task.task_id)}
         className={`group bg-transparent relative transition-all cursor-default duration-300 ease-in-out ${className} ${
            task.is_task_completed
               ? 'line-through text-gray-300 decoration-gray-300 decoration-2'
               : ''
         }`}
      >
         {task.is_task_completed ? (
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
