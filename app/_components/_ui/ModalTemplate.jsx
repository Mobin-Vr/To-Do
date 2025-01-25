import { useEffect, useRef } from 'react';
import { delay } from '../../_lib/utils';

export default function ModalTemplate({
   children,
   parentRef,
   className,
   isModalOpen,
   toggleModal,
}) {
   const modalRef = useRef(null);

   useEffect(() => {
      if (isModalOpen) {
         async function handleClickOutside() {
            await delay(300);
            toggleModal();
         }

         document.addEventListener('mousedown', handleClickOutside);

         return () =>
            document.removeEventListener('mousedown', handleClickOutside);
      }
   }, [isModalOpen, toggleModal, parentRef]);

   if (!isModalOpen) return null;

   return (
      <div
         ref={modalRef}
         className={`absolute bg-white rounded-md shadow-2xl flex flex-col z-50 text-sm font-normal text-gray-600 border border-1 border-gray-200 overflow-hidden ${className}`}
      >
         {children}
      </div>
   );
}
