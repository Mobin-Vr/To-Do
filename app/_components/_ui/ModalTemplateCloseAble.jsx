import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ModalTemplateCloseAble({
   children,
   className,
   isModalOpen,
   toggleModal,
   justify = '0',
}) {
   const modalRef = useRef(null);

   useEffect(() => {
      if (isModalOpen) {
         async function handleClickOutside() {
            toggleModal();
         }

         document.addEventListener('mousedown', handleClickOutside);

         return () =>
            document.removeEventListener('mousedown', handleClickOutside);
      }
   }, [isModalOpen, toggleModal]);

   return (
      <AnimatePresence>
         {isModalOpen && (
            <motion.div
               ref={modalRef}
               initial={{ opacity: 0, scale: 0.8, x: justify }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               transition={{ duration: 0.2, ease: 'easeOut' }}
               className={`absolute bg-white rounded-md shadow-2xl flex flex-col z-50 text-sm font-normal text-gray-600 border border-gray-200 overflow-hidden ${className}`}
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   );
}
