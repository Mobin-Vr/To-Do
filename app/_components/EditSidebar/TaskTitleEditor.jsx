import useTaskStore from '@/app/taskStore';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function TaskTitleEditor({ task, className }) {
   const updateTitle = useTaskStore((state) => state.updateTitle);

   const textareaRef = useRef(null);

   const [isTyping, setIsTyping] = useState(false);
   const [currentTitle, setCurrentTitle] = useState(task.title);
   const [previousTitle, setPreviousTitle] = useState(task.title);
   const [hasTrimed, setHasTrimed] = useState(false); // This state manages title trimming. It ensures the component reflects the trimmed title, as trimming alone doesn’t trigger a re-render. Updating this state forces a manual re-render.

   const adjustHeight = useCallback(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }, []);

   useEffect(() => {
      setCurrentTitle(task.title);
      adjustHeight();
   }, [task.title, hasTrimed, adjustHeight]);

   // 1. Save the current value when input is focused (onFocus)
   function handleFocus() {
      setPreviousTitle(currentTitle);
      setIsTyping(true);
   }

   // 2. Update the current title while typing (onChange)
   function handleUpdateTitle(e) {
      setCurrentTitle(e.target.value);
      adjustHeight();
   }

   // 3. Store the title if it's not empty, otherwise restore the previous one (onBlur)
   function handleBlur() {
      setIsTyping(false);
      if (currentTitle.trim() === '') setCurrentTitle(previousTitle);
      if (currentTitle.trim() !== '') {
         updateTitle(task.id, currentTitle.trim());
         setCurrentTitle(currentTitle.trim());
         setHasTrimed(true);
      }
   }

   return (
      <textarea
         ref={textareaRef}
         onFocus={handleFocus}
         onBlur={handleBlur}
         value={currentTitle}
         onChange={handleUpdateTitle}
         maxLength={150}
         className={`bg-inherit outline-none resize-none whitespace-pre-wrap break-words overflow-hidden w-full min-h-[2rem] p-2 ${className} ${
            task.isCompleted && !isTyping ? 'line-through text-gray-800' : ''
         }`}
         rows={1}
      />
   );
}
