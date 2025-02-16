import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ModalTemplate({
   children,
   isModalOpen,
   toggleModal,
   className,
   justify = '0',
}) {
   const modalRef = useRef(null);

   useEffect(() => {
      if (isModalOpen) {
         async function handleClickOutside(e) {
            if (!modalRef.current.contains(e.target)) {
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
      <AnimatePresence>
         {isModalOpen && (
            <motion.div
               ref={modalRef}
               initial={{ opacity: 0, scale: 0.8, x: justify }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               transition={{ duration: 0.2, ease: 'easeOut' }}
               className={`absolute bg-white rounded-md shadow-2xl z-40 text-sm font-normal text-gray-800 border border-1 border-gray-300 overflow-hidden ${className}`}
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   );
}
