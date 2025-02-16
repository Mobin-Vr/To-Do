'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { delay } from '../_lib/utils';
import useTaskStore from '../taskStore';
import DefaultMinimizer from './minimizer/DefaultMinimizer';
import PlannedMinimizer from './minimizer/PlannedMinimizer';
import AllMinimizer from './minimizer/AllMinimizer';
import { defaultCategoryId } from '../_lib/configs';
import EditSidebar from './EditSidebar/EditSidebar';

export default function TasksList({
   listRef,
   bgColor,
   categoryId,
   tasks,
   listName,
}) {
   const {
      toggleEditSidebar,
      isEditSidebarOpen,
      activeTask,
      setActiveTask,
      sortMethod,
      sortMethodForShared,
      getCategoriesList,
   } = useTaskStore(
      useShallow((state) => ({
         toggleEditSidebar: state.toggleEditSidebar,
         isEditSidebarOpen: state.isEditSidebarOpen,
         activeTask: state.activeTask,
         setActiveTask: state.setActiveTask,
         sortMethod: state.sortMethod,
         sortMethodForShared: state.sortMethodForShared,
         getCategoriesList: state.getCategoriesList,
      }))
   );

   // Refer to the comment "2"
   useEffect(() => {
      setActiveTask(tasks.find((task) => task.task_id === activeTask?.task_id));
   }, [tasks, activeTask, setActiveTask]);

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

      const cond = e.target.closest('.task-item').id === activeTask?.task_id;

      if (!isEditSidebarOpen) {
         setActiveTask(selectedTask);
         await delay(300);
         toggleEditSidebar();
      }

      if (isEditSidebarOpen && cond) {
         toggleEditSidebar();
         setActiveTask(tasks[0]); // Refer to the comment "1"
      }

      if (isEditSidebarOpen && !cond) {
         toggleEditSidebar();
         await delay(200);
         setActiveTask(selectedTask);
         toggleEditSidebar();
      }
   }

   if (tasks?.length === 0 && categoryId) return null;

   const cond =
      listName === 'Tasks' ||
      listName === 'My Day' ||
      listName === 'Important' ||
      categoryId !== defaultCategoryId;

   return (
      <div>
         {cond && (
            <DefaultMinimizer
               tasks={tasks}
               listRef={listRef}
               bgColor={bgColor}
               listName={listName}
               handleToggleSidebar={handleToggleSidebar}
               sortMethod={
                  categoryId === defaultCategoryId
                     ? sortMethod
                     : sortMethodForShared
               }
            />
         )}

         {listName === 'Search' && (
            <DefaultMinimizer
               tasks={tasks}
               listRef={listRef}
               bgColor={bgColor}
               sortMethod={sortMethod}
               handleToggleSidebar={handleToggleSidebar}
               isVisibleByDefault={true}
               listName={listName}
            />
         )}

         {listName === 'Planned' && (
            <PlannedMinimizer
               tasks={tasks}
               listRef={listRef}
               bgColor={bgColor}
               handleToggleSidebar={handleToggleSidebar}
               listName={listName}
            />
         )}

         {(listName === 'All' || listName === 'Completed') && (
            <AllMinimizer
               tasks={tasks}
               listRef={listRef}
               bgColor={bgColor}
               handleToggleSidebar={handleToggleSidebar}
               getCategoriesList={getCategoriesList}
               listName={listName}
            />
         )}

         {/* It has some BUG  */}
         <EditSidebar
            task={activeTask || {}}
            className='edit-sidebar'
            bgColor={bgColor}
            listName={listName}
         />
      </div>
   );
}

/* Comments: 
* 1. Why not set activeTask to null? Using null would require conditional rendering of the sidebar, causing a flicker during the transition. Assigning the first task ensures smooth animations.

* 2. Without this useEffect, activeTask would only update when handleToggleSidebar runs. This causes the activeTask to become stale if tasks changes elsewhere. This useEffect ensures activeTask dynamically updates whenever tasks changes, keeping the UI in sync with the latest state. 
*/
