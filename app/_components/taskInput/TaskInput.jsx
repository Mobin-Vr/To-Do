'use client';

import { CircleIcon, PlusIcon } from '@/public/icons';
import { useState } from 'react';
import {
   defaultCategoryId,
   generateNewUuid,
   getDateNowIso,
} from '../../_lib/utils';
import useTaskStore from '../../store';
import InputAddDue from './InputAddDue';
import InputAddReminder from './InputAddReminder';
import InputAddRepeat from './InputAddRepeat';
import { useShallow } from 'zustand/react/shallow';

export default function TaskInput({ bgColor, className, categoryId }) {
   const { addTaskToStore, userInfo } = useTaskStore(
      useShallow((state) => ({
         addTaskToStore: state.addTaskToStore,
         userInfo: state.userInfo,
      }))
   );

   const [taskInput, setTaskInput] = useState('');
   const [isTyping, setIsTyping] = useState(false);

   const [taskReminder, setTaskReminder] = useState(null);
   const [taskDueDate, setTaskDueDate] = useState(null);
   const [taskRepeat, setTaskRepeat] = useState(null);

   function handleSubmit(e) {
      e.preventDefault();
      if (taskInput.trim() === '') return;

      const newItem = {
         id: generateNewUuid(),
         ownerId: userInfo.id,
         title: taskInput,
         isCompleted: false,
         isStarred: false,
         note: '',
         isAddedToMyDay: false,
         categoryId,
         updatedAt: null,
         completedAt: null,
         createdAt: getDateNowIso(),
         dueDate: taskDueDate,
         reminder: taskReminder,
         repeat: taskRepeat,
         parentTaskId: null,
         assignedTo: null,
         steps: [],
      };

      addTaskToStore(newItem);
      setTaskInput('');
   }

   function handleFocus() {
      setIsTyping(true);
   }

   function handleBlur() {
      setIsTyping(false);
   }

   return (
      <div
         className={`relative ${className}`}
         style={{ backgroundColor: bgColor[0] }}
      >
         <form
            className='flex items-center  h-[2.9rem] w-full z-10 border border-1 border-gray-300 rounded-md overflow-hidden'
            onSubmit={handleSubmit}
         >
            <button className='absolute left-9 cursor-pointer'>
               {isTyping ? <CircleIcon /> : <PlusIcon />}
            </button>

            <input
               type='text'
               value={taskInput}
               onChange={(e) => setTaskInput(e.target.value)}
               onFocus={handleFocus}
               onBlur={handleBlur}
               className={`px-10 text-sm font-light outline-none w-full h-full rounded-sm ${
                  isTyping ? 'placeholder-gray-500' : 'placeholder-gray-800'
               }`}
               placeholder={
                  isTyping
                     ? `Try typing 'Pay utilities bill by Friday 6pm'`
                     : 'Add a task'
               }
            />
         </form>

         {taskInput.length > 0 && (
            <>
               <InputAddReminder
                  setTaskReminder={setTaskReminder}
                  className='absolute right-[6rem] top-3.5'
               />

               <InputAddDue
                  setTaskDueDate={setTaskDueDate}
                  className='absolute right-[4.25rem] top-3.5'
               />

               <InputAddRepeat
                  setTaskRepeat={setTaskRepeat}
                  setTaskDueDate={setTaskDueDate}
                  taskDueDate={taskDueDate}
                  taskRepeat={taskRepeat}
                  className='absolute right-10 top-3.5'
               />

               {/* LATER Add category */}
            </>
         )}
      </div>
   );
}
