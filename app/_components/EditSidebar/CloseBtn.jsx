import useTaskStore from '@/app/store';
import { XIcon } from '@/public/icons';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function CloseBtn() {
   const closeRef = useRef(null);

   const { toggleEditSidebar, setActiveTaskId } = useTaskStore(
      useShallow((state) => ({
         toggleEditSidebar: state.toggleEditSidebar,
         setActiveTaskId: state.setActiveTaskId,
      }))
   );

   function handleClose() {
      toggleEditSidebar();
      setActiveTaskId(null);
   }

   return (
      <button
         ref={closeRef}
         onClick={handleClose}
         className='flex justify-end w-full mb-4 px-2'
      >
         <XIcon />
      </button>
   );
}
