import { useEffect, useRef } from 'react';
import { delay } from '../../_lib/utils';

export default function ModalTemplateCloseAble({
   children,
   className,
   isModalOpen,
   toggleModal,
}) {
   const modalRef = useRef(null);

   useEffect(() => {
      if (isModalOpen) {
         async function handleClickOutside(e) {
            if (!modalRef.current.contains(e.target)) {
               await delay(300);
               toggleModal();
            }
         }

         document.addEventListener('mousedown', handleClickOutside);

         return () =>
            document.removeEventListener('mousedown', handleClickOutside);
      }
   }, [isModalOpen, toggleModal]);

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
