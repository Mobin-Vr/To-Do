import { FullStarIcon, StarIcon } from '@/public/icons';
import useTaskStore from '../../taskStore';

const btnStyles = `
   .btnStyles {
      color: var(--default-text-color);
   }

   .btnStyles:hover {
      color: var(--hover-text-color);
   }
`;

export default function StarBtn({ task, starBtnRef, className, bgColor }) {
   const toggleStarred = useTaskStore((state) => state.toggleStarred);

   return (
      <button
         ref={starBtnRef}
         className={`btnStyles h-4 w-4 p-0 border-none cursor-pointer text-lg ml-2 transition-colors duration-200 ${className}`}
         onClick={() => toggleStarred(task.task_id)}
         style={{ '--hover-text-color': bgColor[3] }}
      >
         {task.is_task_starred ? (
            <span
               className='btnStyles'
               style={{ '--default-text-color': bgColor[3] }}
            >
               <FullStarIcon />
            </span>
         ) : (
            <span>
               <StarIcon />
            </span>
         )}
      </button>
   );
}
