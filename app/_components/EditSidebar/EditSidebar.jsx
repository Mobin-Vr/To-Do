'use client';

import useTaskStore from '@/app/taskStore';
import { useShallow } from 'zustand/react/shallow';
import ActionFooter from './ActionFooter';
import AddFile from './AddFile';
import AddNote from './AddNote';
import AddToMyDay from './AddToMyDay';
import ReminderBox from './reminderBox/ReminderBox';
import TaskOverView from './TaskOverView';
import CloseBtn from '../_ui/CloseBtn';
import { useEffect } from 'react';

export default function EditSidebar({ className, task, bgColor, listName }) {
   const {
      isEditSidebarOpen,
      toggleEditSidebar,
      deleteTaskFromStore,
      updateNote,
   } = useTaskStore(
      useShallow((state) => ({
         isEditSidebarOpen: state.isEditSidebarOpen,
         toggleEditSidebar: state.toggleEditSidebar,
         deleteTaskFromStore: state.deleteTaskFromStore,
         updateNote: state.updateNote,
      }))
   );

   // Refer to the comment "1"
   useEffect(() => {
      if (
         listName === 'My Day' &&
         isEditSidebarOpen &&
         !task.is_task_in_myday
      ) {
         toggleEditSidebar();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [task.is_task_in_myday]);

   useEffect(() => {
      if (
         listName === 'Important' &&
         isEditSidebarOpen &&
         !task.is_task_starred
      ) {
         toggleEditSidebar();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [task.is_task_starred]);

   useEffect(() => {
      if (
         listName === 'Completed' &&
         isEditSidebarOpen &&
         !task.is_task_completed
      ) {
         toggleEditSidebar();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [task.is_task_completed]);

   useEffect(() => {
      if (
         listName === 'Planned' &&
         isEditSidebarOpen &&
         !task.task_due_date &&
         !task.task_reminder
      ) {
         toggleEditSidebar();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [task.task_due_date, task.task_reminder]);

   return (
      <div
         className={`${className} fixed top-0 right-0 bottom-0 w-4/6 h-full border border-1 border-gray-300 bg-sidebar-main flex flex-col justify-between z-20 transform transition-transform ease-in-out duration-300 sm:translate-x-0 sm:static md:max-w-72 sm:max-w-64 text-sm font-light text-black shadow-2xl rounded-md ${
            isEditSidebarOpen ? 'translate-x-0' : 'translate-x-full'
         }`}
      >
         <div className='flex flex-col py-3 px-3 overflow-y-scroll h-full'>
            <CloseBtn />

            <div className='flex flex-col gap-2.5 justify-self-start flex-1'>
               <TaskOverView task={task} bgColor={bgColor} />
               <AddToMyDay task={task} />
               <ReminderBox task={task} />
               <AddFile />
               <AddNote
                  updateNote={updateNote}
                  task={task}
                  isEditSidebarOpen={isEditSidebarOpen}
               />
            </div>
         </div>

         <ActionFooter
            task={task}
            deleteTaskFromStore={deleteTaskFromStore}
            toggleEditSidebar={toggleEditSidebar}
         />
      </div>
   );
}

/* Comments:
 * 1. If the page is "My Day", we should close the EditSidebar after removing My Day, because the task will no longer be in "My Day". Keeping it open could cause issues when updating the task.
 */
