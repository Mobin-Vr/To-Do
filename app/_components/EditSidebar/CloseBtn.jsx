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
      <div className='w-full flex justify-end '>
         <button ref={closeRef} onClick={handleClose} className='p-2 pb-4'>
            <XIcon />
         </button>
      </div>
   );
}
