/* 
   We used 'closest' instead of 'ref' because 'ref' can sometimes fail to detect clicks, especially if React hasn't updated the DOM yet. 
   'closest' allows us to check if the clicked element is inside a specific DOM element, which is more reliable for handling outside clicks, 
   ensuring the sidebar closes properly when clicked outside, regardless of React's DOM state.
*/

import TaskTitle from '../../TaskTitle';
import TaskTitleEditor from '../TaskTitleEditor';
import StepCompleteBtn from './StepCompleteBtn';

// Define styles for the TaskItem component
const stepItemStyles = `
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

export default function StepItem({ step, taskId }) {
   return (
      <li className='flex bg-red-300 px-1 min-h-fit'>
         <StepCompleteBtn taskId={taskId} step={step} className='mt-1' />

         <TaskTitleEditor
            task={step}
            className='text-[0.8rem] font-normal whitespace-pre-wrap break-words h-fit w-[95%] flex flex-col justify-center overflow-hidden flex-1 mx-2 border-b border-1 border-b-gray-300'
         />

         {/* Include the styles */}
         {/* <style>{stepItemStyles}</style> */}
      </li>
   );
}
