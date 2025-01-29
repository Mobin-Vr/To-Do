import { FullStarIcon, StarIcon } from '@/public/icons';
import useTaskStore from '../../taskStore';

export default function StarBtn({ task, starBtnRef, className }) {
   const toggleStarred = useTaskStore((state) => state.toggleStarred);

   return (
      <button
         ref={starBtnRef}
         className={`h-4 w-4 p-0 bg-none border-none text-gray-300 cursor-pointer text-lg ml-2 transition-colors duration-300 ${className}`}
         onClick={() => toggleStarred(task.id)}
      >
         {task.isStarred ? <FullStarIcon /> : <StarIcon />}
      </button>
   );
}
