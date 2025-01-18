'use client';

import useTaskStore from '@/app/store';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import ActionFooter from './ActionFooter';
import AddCategory from './AddCategory';
import AddFile from './AddFile';
import AddNote from './AddNote';
import CloseBtn from './CloseBtn';
import ReminderBox from './ReminderBox/ReminderBox';
import TaskOverView from './TaskOverView';

export default function EditSidebar({ sidebarRef, className, task }) {
   const boxRef = useRef(null);

   const {
      isEditSidebarOpen,
      deleteTaskFromStore,
      setActiveTaskId,
      toggleEditSidebar,
      updateNote,
   } = useTaskStore(
      useShallow((state) => ({
         isEditSidebarOpen: state.isEditSidebarOpen,
         deleteTaskFromStore: state.deleteTaskFromStore,
         setActiveTaskId: state.setActiveTaskId,
         toggleEditSidebar: state.toggleEditSidebar,
         updateNote: state.updateNote,
      }))
   );

   return (
      <div
         ref={sidebarRef}
         className={`${className} fixed top-0 right-0 bottom-0 w-4/6 h-full border border-1 border-gray-300 bg-accent-100 flex flex-col justify-between z-20 transform transition-transform ease-in-out duration-300 sm:translate-x-0 sm:static md:max-w-72 sm:max-w-64 ${
            isEditSidebarOpen ? 'translate-x-0' : 'translate-x-full'
         }`}
      >
         <div className='flex flex-col py-3 px-3 overflow-y-scroll h-full'>
            <CloseBtn />

            <div className='flex flex-col gap-2 justify-self-start flex-1 '>
               <TaskOverView task={task} />
               <AddCategory />
               <ReminderBox task={task} />
               <AddFile />
               <AddNote boxRef={boxRef} updateNote={updateNote} task={task} />
            </div>

            {/* Only for manging the scroll view */}
            <div ref={boxRef} className='h-1 mt-4'></div>
         </div>

         <ActionFooter
            task={task}
            deleteTaskFromStore={deleteTaskFromStore}
            toggleEditSidebar={toggleEditSidebar}
            setActiveTaskId={setActiveTaskId}
         />
      </div>
   );
}
