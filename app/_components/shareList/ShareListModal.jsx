import useCustomToast from '@/app/_lib/useCustomeToast';
import useTaskStore from '@/app/taskStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useTransition } from 'react';
import { useShallow } from 'zustand/react/shallow';
import InitialView from './InitialView';
import LinkCreatedView from './LinkCreatedView';
import MoreOptionsView from './MoreOptionsView';

export default function SharedListModal({ toggleModal, theCategoryId }) {
   const showToast = useCustomToast();

   const [isPending, startTransition] = useTransition();
   const [direction, setDirection] = useState(1); // 1: forward, -1: backward

   const { createInvitationInStore, invitations } = useTaskStore(
      useShallow((state) => ({
         createInvitationInStore: state.createInvitationInStore,
         invitations: state.invitations,
      }))
   );

   const link =
      invitations.find((inv) => inv.categoryId === theCategoryId)
         ?.invitationLink || '';

   const [currentView, setCurrentView] = useState(
      link ? 'linkCreated' : 'initial'
   );

   // Handlers for navigation
   function handleCreateLink() {
      startTransition(async () => {
         const wasSuccessful = await createInvitationInStore(theCategoryId);
         if (wasSuccessful) setCurrentView('linkCreated');
         if (!wasSuccessful) showToast('Tray again later!');
      });
   }

   const handleMoreOptions = () => {
      setDirection(1); // Forward
      setCurrentView('moreOptions');
   };

   const handleBackToLinkCreated = () => {
      setDirection(-1); // Backward
      setCurrentView('linkCreated');
   };

   // Animation variants for slide transitions
   const slideVariants = {
      opacityIn: { opacity: 0, duration: 0.2 },
      opacityAnimate: { opacity: 1, duration: 0.2 },
      opacityExit: { opacity: 0, duration: 0.2 },

      initial: (direction) => ({
         x: direction === 1 ? '-100%' : '100%',
         opacity: 0,
      }),

      animate: {
         x: 0,
         opacity: 1,
         transition: { duration: 0.25 },
      },

      exit: (direction) => ({
         x: direction === 1 ? '100%' : '-100%',
         opacity: 0,
         transition: { duration: 0.25 },
      }),
   };

   return (
      <div className='h-full overflow-hidden relative'>
         <AnimatePresence custom={direction} exitBeforeEnter>
            {currentView === 'initial' && (
               <motion.div
                  key='initial'
                  variants={slideVariants}
                  initial='opacityIn'
                  animate='opacityAnimate'
                  exit='opacityExit'
                  className='absolute w-full h-full'
               >
                  <InitialView
                     onCreateLink={handleCreateLink}
                     toggleModal={toggleModal}
                     isPending={isPending}
                  />
               </motion.div>
            )}

            {currentView === 'linkCreated' && (
               <motion.div
                  key='linkCreated'
                  variants={slideVariants}
                  initial={link ? 'opacityIn' : 'initial'}
                  animate={link ? 'opacityAnimate' : 'animate'}
                  exit={link ? 'opacityExit' : 'exit'}
                  custom={direction}
                  className='absolute w-full h-full'
               >
                  <LinkCreatedView
                     onMoreOptions={handleMoreOptions}
                     toggleModal={toggleModal}
                     link={link}
                  />
               </motion.div>
            )}

            {currentView === 'moreOptions' && (
               <motion.div
                  key='moreOptions'
                  variants={slideVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  custom={direction}
                  className='absolute w-full h-full'
               >
                  <MoreOptionsView
                     onBackToLinkCreated={handleBackToLinkCreated}
                     toggleModal={toggleModal}
                     link={link}
                     theCategoryId={theCategoryId}
                  />
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
