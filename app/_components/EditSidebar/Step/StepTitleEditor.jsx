import useTaskStore from '@/app/taskStore';
import { useEffect, useRef, useState } from 'react';

export default function StepTitleEditor({ step, taskId, className }) {
   const textareaRef = useRef(null);
   const updateStep = useTaskStore((state) => state.updateStep);
   const [isTyping, setIsTyping] = useState(false);
   // Current value for display
   const [currentTitle, setCurrentTitle] = useState(step.title);
   // Store the previous title value
   const [previousTitle, setPreviousTitle] = useState(step.title);

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }, [step.title]);

   // 1. Save the current value when input is focused (onFocus)
   function handleFocus() {
      setPreviousTitle(currentTitle);
      setIsTyping(true);
   }

   // 2. Update the current title while typing (onChange)
   function handleUpdateTitle(e) {
      setCurrentTitle(e.target.value);

      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }

   // 3. Store the title if it's not empty, otherwise restore the previous one (onBlur)
   function handleBlur() {
      setIsTyping(false);
      if (currentTitle.trim())
         updateStep(taskId, step.id, { title: currentTitle });
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
         className={`bg-inherit outline-none resize-none whitespace-pre-wrap break-words overflow-hidden content-center py-2 w-full mx-2 text-sm font-light ${className} ${
            step.isCompleted && !isTyping ? 'line-through text-gray-800' : ''
         }`}
         rows={1}
      />
      //  {/* <Border className='w-full' /> */}
   );
}
