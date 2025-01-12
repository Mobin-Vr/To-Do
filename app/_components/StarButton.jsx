import { FullStarIcon, StarIcon } from '@/public/icons';
import useTaskStore from '../store';

export default function StarButton({ task }) {
   const { toggleStarred } = useTaskStore();

   return (
      <button
         className='h-4 w-4 p-0 bg-none border-none text-gray-300 cursor-pointer text-lg ml-2 transition-colors duration-300'
         onClick={() => toggleStarred(task.id)}
      >
         {task.isStarred ? <FullStarIcon /> : <StarIcon />}
      </button>
   );
}
