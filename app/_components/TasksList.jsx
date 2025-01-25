import { useEffect, useState } from 'react';
import { delay, sortTasks } from '../_lib/utils';
import CompletedToggle from './CompletedToggle';
import EditSidebar from './EditSidebar/EditSidebar';
import TaskGroup from './TaskGroup';
import useTaskStore from '../store';
import { useShallow } from 'zustand/react/shallow';

export default function TasksList({ listRef, bgColor, categoryId }) {
   const {
      toggleEditSidebar,
      isEditSidebarOpen,
      tasksList,
      activeTask,
      setActiveTask,
      sortMethod,
   } = useTaskStore(
      useShallow((state) => ({
         toggleEditSidebar: state.toggleEditSidebar,
         isEditSidebarOpen: state.isEditSidebarOpen,
         tasksList: state.tasksList,
         activeTask: state.activeTask,
         setActiveTask: state.setActiveTask,
         sortMethod: state.sortMethod,
      }))
   );

   const [isCompletedVisible, setCompletedVisible] = useState(false);
   // Why not set activeTask to null? Using null would require conditional rendering of the sidebar, causing a flicker during the transition. Assigning the first task ensures smooth animations.

   /* Without this useEffect, activeTask would only update when handleToggleSidebar runs. This causes the activeTask to become stale if tasksList changes elsewhere. This useEffect ensures activeTask dynamically updates whenever tasksList changes, keeping the UI in sync with the latest state. */
   useEffect(() => {
      setActiveTask(tasksList.find((t) => t.id === activeTask?.id));
   }, [tasksList, activeTask, setActiveTask]);

   // Handle outside clicks
   useEffect(() => {
      async function handleClickOutside(e) {
         if (
            isEditSidebarOpen &&
            !e.target.closest('.task-item') &&
            !e.target.closest('.edit-sidebar')
         )
            toggleEditSidebar();
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener('mousedown', handleClickOutside);
   }, [toggleEditSidebar, isEditSidebarOpen]);

   // Handle sidebar toggle when clicking on the task item.
   async function handleToggleSidebar(selectedTask, e) {
      if (e.target.closest('.complete-btn') || e.target.closest('.star-btn'))
         return;

      const cond = e.target.closest('.task-item').id === activeTask?.id;

      if (!isEditSidebarOpen) {
         setActiveTask(selectedTask);
         await delay(300);
         toggleEditSidebar();
      }

      if (isEditSidebarOpen && cond) {
         toggleEditSidebar();
         setActiveTask(tasksList[0]); // Why not set activeTask to null? Using null would require conditional rendering of the sidebar, causing a flicker during the transition. Assigning the first task ensures smooth animations.
      }

      if (isEditSidebarOpen && !cond) {
         toggleEditSidebar();
         await delay(200);
         setActiveTask(selectedTask);
         toggleEditSidebar();
      }
   }

   if (tasksList.length === 0 && categoryId) return null;

   const tasks = tasksList.filter((task) => task.categoryId === categoryId); // only the relevent tasks not all categories

   const completedTasks = tasks.filter((task) => task.isCompleted);
   const uncompletedTasks = tasks.filter((task) => !task.isCompleted);

   const sortedCompletedTasks = sortTasks(completedTasks, sortMethod);
   const sortedUncompletedTasks = sortTasks(uncompletedTasks, sortMethod);

   return (
      <div>
         <TaskGroup
            tasks={sortedUncompletedTasks}
            listRef={listRef}
            bgColor={bgColor}
            handleToggleSidebar={handleToggleSidebar}
         />
         {completedTasks.length > 0 && (
            <>
               <CompletedToggle
                  isCompletedVisible={isCompletedVisible}
                  completedCount={completedTasks.length}
                  onClick={() => setCompletedVisible(!isCompletedVisible)}
                  bgColor={bgColor}
               />

               {isCompletedVisible && (
                  <TaskGroup
                     tasks={sortedCompletedTasks}
                     listRef={listRef}
                     bgColor={bgColor}
                     handleToggleSidebar={handleToggleSidebar}
                  />
               )}
            </>
         )}

         <EditSidebar task={activeTask} className='edit-sidebar' />
      </div>
   );
}
