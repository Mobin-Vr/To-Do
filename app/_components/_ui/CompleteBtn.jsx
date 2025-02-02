import { CircleIcon, CompletedIcon, TickCircleIcon } from '@/public/icons';
import useTaskStore from '../../taskStore';

const btnStyles = `
   .btnStyles {
      color: var(--default-text-color);
   }

   .btnStyles:hover {
      color: var(--hover-text-color);
   }
`;

export default function CompleteBtn({ task, compBtnRef, className, bgColor }) {
   const toggleCompleted = useTaskStore((state) => state.toggleCompleted);

   return (
      <button
         style={{ '--hover-text-color': bgColor[3] }}
         ref={compBtnRef}
         onClick={() => toggleCompleted(task.task_id)}
         className={`btnStyles group bg-transparent relative transition-all cursor-default duration-200 ease-in-out ${className} ${
            task.is_task_completed
               ? 'line-through decoration-gray-300 decoration-2'
               : ''
         }`}
      >
         {task.is_task_completed ? (
            <span
               className='btnStyles'
               style={{ '--default-text-color': bgColor[3] }}
            >
               <CompletedIcon />
            </span>
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

         <style>{btnStyles}</style>
      </button>
   );
}
