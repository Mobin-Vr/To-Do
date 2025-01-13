import CompleteButton from './CompleteButton';
import StarButton from './StarButton';
import TaskDescription from './TaskDescription';

// Define styles for the TaskItem component
const taskItemStyles = `
   .task-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 3rem;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: background-color 0.3s ease-in-out;
      background-color: var(--default-bg-color);
   }

   .task-item:hover {
      background-color: var(--hover-bg-color);
   }
`;

export default function TaskItem({ task, listRef, bgColor }) {
   return (
      <li
         ref={listRef}
         className='task-item'
         style={{
            '--default-bg-color': bgColor[1],
            '--hover-bg-color': bgColor[2],
         }}
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

         {/* Include the styles */}
         <style>{taskItemStyles}</style>
      </li>
   );
}
