'use client';

import { BG_COLORS } from '@/app/_lib/configs';
import useTaskStore from '@/app/taskStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import CloseBtn from '../_ui/CloseBtn';
import ActionFooter from './ActionFooter';
import AddFile from './AddFile';
import AddNote from './AddNote';
import AddToMyDay from './AddToMyDay';
import ReminderBox from './reminderBox/ReminderBox';
import TaskOverView from './TaskOverView';

export default function EditSidebar() {
   const pageName = usePathname().split('/').at(-1);
   const bgColor = BG_COLORS[`/${pageName}`];

   const {
      isEditSidebarOpen,
      toggleEditSidebar,
      deleteTaskFromStore,
      updateNote,
      activeTask,
      setActiveTask,
      tasksList,
   } = useTaskStore(
      useShallow((state) => ({
         isEditSidebarOpen: state.isEditSidebarOpen,
         toggleEditSidebar: state.toggleEditSidebar,
         deleteTaskFromStore: state.deleteTaskFromStore,
         updateNote: state.updateNote,
         activeTask: state.activeTask,
         setActiveTask: state.setActiveTask,
         tasksList: state.tasksList,
      }))
   );

   // Refer to the comment "1"
   useEffect(() => {
      // Only update activeTask when it has changed and exists in tasksList
      if (activeTask) {
         const updatedTask = tasksList.find(
            (task) => task.task_id === activeTask.task_id
         );

         if (updatedTask) setActiveTask(updatedTask);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tasksList, activeTask?.task_id]);

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

   if (!activeTask) return;

   return (
      <div
         className={`edit-sidebar fixed top-0 right-0 bottom-0 w-4/6 h-full border border-1 border-gray-300 bg-sidebar-main flex flex-col justify-between z-20 transform transition-transform ease-in-out duration-300 sm:translate-x-0 sm:static md:max-w-72 sm:max-w-64 text-sm font-light text-black shadow-2xl rounded-md ${
            isEditSidebarOpen ? 'translate-x-0' : 'translate-x-full'
         }`}
      >
         <div className='flex flex-col py-3 px-3 overflow-y-scroll h-full'>
            <CloseBtn toggleEditSidebar={toggleEditSidebar} />

            <div className='flex flex-col gap-2.5 justify-self-start flex-1'>
               <TaskOverView task={activeTask} bgColor={bgColor} />
               <AddToMyDay task={activeTask} />
               <ReminderBox task={activeTask} />
               <AddFile />
               <AddNote
                  task={activeTask}
                  updateNote={updateNote}
                  isEditSidebarOpen={isEditSidebarOpen}
               />
            </div>
         </div>

         <ActionFooter
            task={activeTask}
            deleteTaskFromStore={deleteTaskFromStore}
            toggleEditSidebar={toggleEditSidebar}
         />
      </div>
   );
}

/* Comments:
 * 1. Without this useEffect, activeTask would only update when toggleSidebar runs. This causes the activeTask to become stale if tasks changes elsewhere. This useEffect ensures activeTask dynamically updates whenever tasks changes, keeping the UI in sync with the latest state.
 */
