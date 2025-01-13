'use client';

import { CircleIcon, PlusIcon } from '@/public/icons';
import { useState } from 'react';
import useTaskStore from '../store';

export default function TaskInput({ bgColor, className }) {
   const addtask = useTaskStore((state) => state.addTask);

   const [taskInput, setTaskInput] = useState('');
   const [isTyping, setIsTyping] = useState(false);

   function handleSubmit(e) {
      e.preventDefault();
      if (taskInput.trim() === '') return;

      const id = Date.now();

      const newItem = {
         id,
         description: taskInput,
         isCompleted: false,
         isStarred: false,
      };

      addtask(newItem);
      setTaskInput('');
   }

   function handleFocus() {
      setIsTyping(true);
   }

   function handleBlur() {
      setIsTyping(false);
   }

   return (
      <div className={`${className}`} style={{ backgroundColor: bgColor[0] }}>
         <form
            className='flex items-center relative h-[2.65rem] w-full z-10 border border-1 border-gray-300 rounded-md overflow-hidden'
            onSubmit={handleSubmit}
         >
            <button className='absolute left-2 cursor-pointer'>
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
      </div>
   );
}
