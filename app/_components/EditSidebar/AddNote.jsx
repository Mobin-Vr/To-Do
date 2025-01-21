import { useEffect, useRef } from 'react';
import BoxTemplate from './BoxTemplate';

function AddNote({ updateNote, task, isEditSidebarOpen }) {
   const textareaRef = useRef(null);

   useEffect(() => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`;
   }, [isEditSidebarOpen, task.note]);

   function handleNote(value) {
      updateNote(task.id, value);
   }

   return (
      <BoxTemplate className='p-3 min-h-20'>
         <textarea
            ref={textareaRef}
            value={task.note ? task.note : ''}
            onChange={(e) => handleNote(e.target.value)}
            placeholder='Add note'
            maxLength={300}
            className='w-full bg-inherit placeholder:text-gray-700 outline-none resize-none'
         />
      </BoxTemplate>
   );
}

export default AddNote;
