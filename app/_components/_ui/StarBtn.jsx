import { FullStarIcon, StarIcon } from '@/public/icons';
import useTaskStore from '../../taskStore';

export default function StarBtn({ task, starBtnRef, className, bgColor }) {
   const toggleStarred = useTaskStore((state) => state.toggleStarred);

   return (
      <button
         ref={starBtnRef}
         className={`h-4 w-4 p-0 border-none cursor-pointer text-lg ml-2 transition-colors duration-200 ${className}`}
         onClick={() => toggleStarred(task.task_id)}
      >
         {task.is_task_starred ? (
            <span style={{ color: bgColor.iconSecondaryColor }}>
               <FullStarIcon />
            </span>
         ) : (
            <span style={{ color: bgColor.ternaryText }}>
               <StarIcon />
            </span>
         )}
      </button>
   );
}
