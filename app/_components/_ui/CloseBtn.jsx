import useTaskStore from '@/app/taskStore';
import { XIcon } from '@/public/icons';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function CloseBtn() {
   const closeRef = useRef(null);

   const { toggleEditSidebar } = useTaskStore(
      useShallow((state) => ({
         toggleEditSidebar: state.toggleEditSidebar,
      }))
   );

   function handleClose() {
      toggleEditSidebar();
   }

   return (
      <div className='w-full flex justify-end '>
         <button ref={closeRef} onClick={handleClose} className='p-1 pb-3'>
            <XIcon />
         </button>
      </div>
   );
}
