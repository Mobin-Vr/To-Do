'use client';

import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import ActionFooter from './ActionFooter';
import AddCategory from './AddCategory';
import AddFile from './AddFile';
import AddNote from './AddNote';
import CloseBtn from './CloseBtn';
import ReminderSection from './ReminderSection';
import TaskOverView from './TaskOverView';
import useTaskStore from '@/app/store';

export default function EditSidebar({ sidebarRef, className, task }) {
   const textareaRef = useRef(null);
   const footerRef = useRef(null);

   const { isEditSidebarOpen } = useTaskStore(
      useShallow((state) => ({
         isEditSidebarOpen: state.isEditSidebarOpen,
      }))
   );

   function handleInput() {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content

      const box = footerRef.current;
      if (box) box.scrollIntoView();
   }

   return (
      <div
         ref={sidebarRef}
         className={`${className} fixed top-0 right-0 bottom-0 w-4/6 h-full border border-1 border-gray-300 bg-accent-100 flex flex-col justify-between z-20 overflow-auto transform transition-transform ease-in-out duration-300 sm:translate-x-0 sm:static md:max-w-72 sm:max-w-64 ${
            isEditSidebarOpen ? 'translate-x-0' : 'translate-x-full'
         }`}
      >
         <div className='flex flex-col pt-4 px-3'>
            <CloseBtn />

            <div className='flex flex-col gap-2 justify-self-start flex-1'>
               <TaskOverView task={task} />
               <AddCategory />
               <ReminderSection />
               <AddFile />
               <AddNote textareaRef={textareaRef} handleInput={handleInput} />
            </div>
         </div>

         <ActionFooter task={task} />
      </div>
   );
}
