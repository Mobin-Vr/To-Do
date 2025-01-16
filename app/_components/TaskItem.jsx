import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import useTaskStore from '../store';
import CompleteButton from './CompleteButton';
import EditSidebar from './EditSidebar/EditSidebar';
import StarButton from './StarButton';
import TaskDescription from './TaskDescription';
import { delay } from '../_lib/utils';

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

export default function TaskItem({ task, listRef, bgColor }) {
   const {
      toggleEditSidebar,
      isEditSidebarOpen,
      taskList,
      activeTaskId,
      setActiveTaskId,
   } = useTaskStore(
      useShallow((state) => ({
         toggleEditSidebar: state.toggleEditSidebar,
         isEditSidebarOpen: state.isEditSidebarOpen,
         taskList: state.taskList,
         activeTaskId: state.activeTaskId,
         setActiveTaskId: state.setActiveTaskId,
      }))
   );

   const activeTask = taskList.find((task) => task.id === activeTaskId);

   /* Handle sidebar toggle when clicking on the task item. (NOT CompleteButton and StarButton) */
   async function handleToggleSidebar(e) {
      const notCompNotStar =
         !e.target.closest('.complete-btn') && !e.target.closest('.star-btn');

      if (notCompNotStar) {
         if (isEditSidebarOpen && activeTaskId === task.id) {
            toggleEditSidebar();
            await delay(200);
            setActiveTaskId(null);
         }

         if (isEditSidebarOpen && activeTaskId !== task.id) {
            toggleEditSidebar();
            await delay(200);
            setActiveTaskId(task.id);
            toggleEditSidebar();
         }

         if (!isEditSidebarOpen && activeTaskId !== task.id) {
            setActiveTaskId(task.id);
            await delay(200);
            toggleEditSidebar();
         }
      }
   }

   // Handle outside clicks
   useEffect(() => {
      async function handleClickOutside(e) {
         /* Refer to the first comment in the file */

         if (
            isEditSidebarOpen &&
            !e.target.closest('.task-item') &&
            !e.target.closest('.edit-sidebar')
         ) {
            toggleEditSidebar();
            await delay(200);
            setActiveTaskId(null); // Close sidebar when clicking outside
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener('mousedown', handleClickOutside);
   }, [toggleEditSidebar, isEditSidebarOpen, setActiveTaskId]);

   return (
      <>
         <li
            ref={listRef}
            onClick={handleToggleSidebar}
            className='task-item' // for click handeling
            style={{
               '--default-bg-color': bgColor[1],
               '--hover-bg-color': bgColor[2],
            }}
         >
            <div className='flex justify-between items-center'>
               <div className='flex items-center'>
                  {/* Added classes to identify the buttons for click handling */}
                  <CompleteButton task={task} className='complete-btn' />
                  <TaskDescription task={task} />
               </div>

               {/* Added classes to identify the buttons for click handling */}
               <StarButton task={task} className='star-btn' />
            </div>

            <div className='font-light text-[0.65rem] text-gray-800 ml-7'>
               Tasks
            </div>

            {/* Include the styles */}
            <style>{taskItemStyles}</style>
         </li>
         {/* Refer to the first comment in the file */}

         {activeTaskId && (
            <EditSidebar task={activeTask} className='edit-sidebar' />
         )}
      </>
   );
}
