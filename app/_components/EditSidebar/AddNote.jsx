import BoxTemplate from './BoxTemplate';

function AddNote({ textareaRef, handleInput }) {
   return (
      <BoxTemplate className='p-3 min-h-20'>
         <textarea
            ref={textareaRef}
            onInput={handleInput}
            placeholder='Add note'
            className='w-full bg-inherit placeholder:text-gray-700 outline-none resize-none'
            rows='1'
         />
      </BoxTemplate>
   );
}

export default AddNote;
