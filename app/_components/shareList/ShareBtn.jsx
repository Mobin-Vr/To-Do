import { ShareIcon } from '@/public/icons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SharedListModal from './ShareListModal';
import ModalTemplate from '../_ui/ModalTemplate';

export default function ShareBtn({ theCategoryId, bgColor }) {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [hover, setHover] = useState(false);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   // Modal animation variants
   const modalVariants = {
      hidden: { opacity: 0, scale: 1 }, // Fade out and shrink
      visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }, // Fade in and grow
      exit: { opacity: 0, scale: 1, transition: { duration: 0.2 } }, // Fade out and shrink
   };

   return (
      <div>
         {/* Button to toggle modal */}
         <button
            onClick={toggleModal}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='p-1 rounded-sm flex items-center justify-center '
            style={{
               backgroundColor: hover ? bgColor.buttonHover : 'transparent',
            }}
         >
            <ShareIcon />
         </button>

         {/* AnimatePresence for handling modal open/close animations */}
         <AnimatePresence>
            {isModalOpen && (
               <motion.div
                  className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50'
                  variants={modalVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
               >
                  <ModalTemplate
                     isModalOpen={isModalOpen}
                     toggleModal={toggleModal}
                     className='relative w-4/6 max-w-80 h-full max-h-[28rem] text-xs font-normal shadow-lg'
                  >
                     <SharedListModal
                        toggleModal={toggleModal}
                        theCategoryId={theCategoryId}
                     />
                  </ModalTemplate>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
