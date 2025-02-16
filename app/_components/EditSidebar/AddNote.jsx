import { useEffect, useRef } from 'react';
import BoxTemplate from './BoxTemplate';

function AddNote({ updateNote, task, isEditSidebarOpen }) {
   const textareaRef = useRef(null);

   useEffect(() => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`;
   }, [isEditSidebarOpen, task.task_note]);

   function handleNote(value) {
      updateNote(task.task_id, value);
   }

   return (
      <BoxTemplate className='p-3 min-h-20'>
         <textarea
            ref={textareaRef}
            value={task.task_note ? task.task_note : ''}
            onChange={(e) => handleNote(e.target.value)}
            placeholder='Add note'
            maxLength={300}
            className='w-full bg-inherit placeholder:text-black outline-none resize-none'
         />
      </BoxTemplate>
   );
}

export default AddNote;
