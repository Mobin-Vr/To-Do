'use client';

import useTaskStore from '@/app/store';
import { useShallow } from 'zustand/react/shallow';
import ActionFooter from './ActionFooter';
import AddFile from './AddFile';
import AddNote from './AddNote';
import AddToMyDay from './AddToMyDay';
import CloseBtn from './CloseBtn';
import ReminderBox from './ReminderBox/ReminderBox';
import TaskOverView from './TaskOverView';

export default function EditSidebar({ className, task }) {
   const {
      isEditSidebarOpen,
      deleteTaskFromStore,
      toggleEditSidebar,
      updateNote,
   } = useTaskStore(
      useShallow((state) => ({
         isEditSidebarOpen: state.isEditSidebarOpen,
         deleteTaskFromStore: state.deleteTaskFromStore,
         toggleEditSidebar: state.toggleEditSidebar,
         updateNote: state.updateNote,
      }))
   );

   return (
      <div
         className={`${className} fixed top-0 right-0 bottom-0 w-4/6 h-full border border-1 border-gray-300 bg-accent-100 flex flex-col justify-between z-20 transform transition-transform ease-in-out duration-300 sm:translate-x-0 sm:static md:max-w-72 sm:max-w-64 text-sm text-gray-700 font-light ${
            isEditSidebarOpen ? 'translate-x-0' : 'translate-x-full'
         }`}
      >
         <div className='flex flex-col py-3 px-3 overflow-y-scroll h-full'>
            <CloseBtn />

            <div className='flex flex-col gap-2.5 justify-self-start flex-1'>
               <TaskOverView task={task} />
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
