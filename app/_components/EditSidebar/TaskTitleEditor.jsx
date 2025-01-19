import useTaskStore from '@/app/store';
import { useState, useEffect, useRef } from 'react';

export default function TaskTitleEditor({ task, className }) {
   const textareaRef = useRef(null);
   const updateTitle = useTaskStore((state) => state.updateTitle);
   const [isTyping, setIsTyping] = useState(false);
   // Current value for display
   const [currentTitle, setCurrentTitle] = useState(task.title);
   // Store the previous title value
   const [previousTitle, setPreviousTitle] = useState(task.title);

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }, [task.title]);

   // 1. Save the current value when input is focused (onFocus)
   function handleFocus() {
      setPreviousTitle(currentTitle);
      setIsTyping(true);
   }

   // 2. Update the current title while typing (onChange)
   function handleUpdateTitle(e) {
      setCurrentTitle(e.target.value);
   }

   // 3. Store the title if it's not empty, otherwise restore the previous one (onBlur)
   function handleBlur() {
      setIsTyping(false);
      if (currentTitle.trim()) updateTitle(task.id, currentTitle);
      if (currentTitle.trim() === '') setCurrentTitle(previousTitle);
   }

   return (
      <textarea
         ref={textareaRef}
         onFocus={handleFocus}
         onBlur={handleBlur}
         value={currentTitle}
         onChange={handleUpdateTitle}
         maxLength={150}
         className={`ml-2 bg-inherit outline-none resize-none whitespace-pre-wrap break-words overflow-hidden w-full min-h-[2rem] p-2 ${className} ${
            task.isCompleted && !isTyping ? 'line-through text-gray-800' : ''
         }`}
         rows={1}
      />
   );
}
