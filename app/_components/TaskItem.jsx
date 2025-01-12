import CompleteButton from './CompleteButton';
import StarButton from './StarButton';
import TaskDescription from './TaskDescription';

export default function TaskItem({ task, listRef }) {
   return (
      <li
         ref={listRef}
         className='flex flex-col justify-center h-12 px-2 bg-accent-100 rounded-md transition-transform duration-300 ease-linear relative hover:bg-accent-50'
      >
         <div className='flex justify-between items-center'>
            <div className='flex items-center'>
               <CompleteButton task={task} />
               <TaskDescription task={task} />
            </div>

            <StarButton task={task} />
         </div>

         <div className='font-light text-[0.65rem] text-gray-800 ml-7'>
            Tasks
         </div>
      </li>
   );
}
