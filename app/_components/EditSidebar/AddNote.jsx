import { useEffect, useRef } from 'react';
import BoxTemplate from './BoxTemplate';

function AddNote({ boxRef, updateNote, task }) {
   const textareaRef = useRef(null);
   const box = boxRef.current;

   function handleInput() {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content

      if (box) box.scrollIntoView();
   }

   useEffect(() => {
      const box = boxRef.current;
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`;

      if (box) box.scrollIntoView();
   }, [task.id, boxRef]);

   function handleNote(value) {
      updateNote(task.id, value);
   }

   return (
      <BoxTemplate className='p-3 min-h-20'>
         <textarea
            ref={textareaRef}
            value={task.note ? task.note : ''}
            onInput={handleInput} // Triggered in real-time whenever the content changes (e.g., typing, pasting, etc.)
            onChange={(e) => handleNote(e.target.value)} // Triggered when the user finalizes their input (e.g., when the input loses focus)
            placeholder='Add note'
            rows='0'
            maxLength={500}
            className='w-full bg-inherit placeholder:text-gray-700 outline-none resize-none'
         />
      </BoxTemplate>
   );
}

export default AddNote;
