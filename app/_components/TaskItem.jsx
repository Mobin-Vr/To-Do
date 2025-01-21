import CompleteButton from './CompleteButton';
import StarButton from './StarButton';
import TaskDetails from './TaskDetails';
import TaskTitle from './TaskTitle';

/* 
   We used 'closest' instead of 'ref' because 'ref' can sometimes fail to detect clicks, especially if React hasn't updated the DOM yet. 
   'closest' allows us to check if the clicked element is inside a specific DOM element, which is more reliable for handling outside clicks, 
   ensuring the sidebar closes properly when clicked outside, regardless of React's DOM state.
*/

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

export default function TaskItem({
   task,
   listRef,
   bgColor,
   handleToggleSidebar,
}) {
   return (
      <li
         ref={listRef}
         id={task.id}
         onClick={(e) => handleToggleSidebar(task, e)}
         className='task-item min-h-fit' // for click handeling
         style={{
            '--default-bg-color': bgColor[1],
            '--hover-bg-color': bgColor[2],
         }}
      >
         <div className='flex justify-between items-start px-2'>
            <CompleteButton task={task} className='complete-btn mt-1' />

            <div className='flex flex-col justify-center overflow-hidden flex-1 px-2'>
               {/* Added class to identify the buttons for click handling */}
               <TaskTitle
                  task={task}
                  className='text-sm font-normal whitespace-pre-wrap break-words h-fit overflow-hidden w-[95%]'
               />

               <TaskDetails task={task} />
            </div>

            {/* Added class to identify the buttons for click handling */}
            <StarButton task={task} className='star-btn mt-1' />
         </div>

         {/* Include the styles */}
         <style>{taskItemStyles}</style>
      </li>
   );
}
