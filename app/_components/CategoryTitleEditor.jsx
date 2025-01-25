import useTaskStore from '@/app/store';
import { useEffect, useRef, useState } from 'react';

export default function CategoryTitleEditor({ theCategory, className }) {
   const textareaRef = useRef(null);
   const updateCategoryInStore = useTaskStore(
      (state) => state.updateCategoryInStore
   );
   // Current value for display
   const [currentTitle, setCurrentTitle] = useState(theCategory?.title);
   // Store the previous title value
   const [previousTitle, setPreviousTitle] = useState(theCategory?.title);
   const [isTyping, setIsTyping] = useState(false);

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }, [theCategory?.title]);

   // 1. Save the current value when input is focused (onFocus)
   function handleFocus() {
      setPreviousTitle(currentTitle);
      setIsTyping(true);
      textareaRef.current?.select();
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
      if (currentTitle.trim())
         updateCategoryInStore(theCategory.id, { title: currentTitle });
      if (currentTitle.trim() === '') setCurrentTitle(previousTitle);
      setIsTyping(false);
   }

   return (
      <input
         type='text'
         ref={textareaRef}
         onFocus={handleFocus}
         onBlur={handleBlur}
         value={currentTitle}
         onChange={handleUpdateTitle}
         maxLength={150}
         className={`bg-inherit outline-none overflow-hidden ${className}`}
      />
   );
}
