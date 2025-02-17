import useTaskStore from '../taskStore';
import CompleteBtn from './_ui/CompleteBtn';
import StarBtn from './_ui/StarBtn';
import TaskDetails from './TaskDetails';
import TaskTitle from './TaskTitle';

// Define styles for the TaskItem component
const taskItemStyles = `
   .task-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 3rem;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--default-bg-color);
   }

   .task-item:hover {
      background-color: var(--hover-bg-color);
   }
`;

export default function TaskItem({ task, listRef, bgColor, listName }) {
   const handleActiveTaskSidebar = useTaskStore(
      (state) => state.handleActiveTaskSidebar
   );

   return (
      <li
         ref={listRef}
         id={task.task_id}
         onClick={(e) => handleActiveTaskSidebar(task, e)}
         className='task-item min-h-12 text-gray-400' // for click handeling
         style={{
            '--default-bg-color': bgColor.taskBackground,
            '--hover-bg-color': bgColor.taskHover,
         }}
      >
         <div className='flex justify-between items-start px-2'>
            <CompleteBtn
               task={task}
               className='complete-btn mt-1'
               bgColor={bgColor}
            />

            <div className='flex flex-col justify-center overflow-hidden flex-1 px-2'>
               {/* Added class to identify the buttons for click handling */}
               <TaskTitle
                  task={task}
                  className='text-sm font-normal whitespace-pre-wrap break-words h-fit overflow-hidden w-[95%] text-black'
               />

               <TaskDetails task={task} listName={listName} />
            </div>

            {/* Added class to identify the buttons for click handling */}
            <StarBtn task={task} className='star-btn mt-1' bgColor={bgColor} />
         </div>

         {/* Include the styles */}
         <style>{taskItemStyles}</style>
      </li>
   );
}
