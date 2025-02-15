import { ClerkLoaded, UserButton } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import ProfileModal from './ProfileModal';
import UserStatus from './UserStatus';

function UserMenu({ user, createClerkPasskey, className }) {
   const userMenuBtnRef = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
   };

   const userButtonAppearance = {
      elements: {
         userButtonAvatarBox: 'w-[2.625rem] h-[2.625rem]',
      },
   };

   return (
      <ClerkLoaded>
         {user && (
            <div className={`flex items-center gap-3 relative ${className}`}>
               {/* NOTE Actually it is user profile */}
               <UserButton appearance={userButtonAppearance} />

               <button
                  className='flex flex-col overflow-hidden'
                  ref={userMenuBtnRef}
                  onClick={toggleModal}
               >
                  <strong
                     title={user.fullName}
                     className='leading-tight text-sm font-medium text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap'
                  >
                     {user.fullName}
                  </strong>

                  <UserStatus user={user} />
               </button>

               {/* Animate modal with backdrop */}
               <AnimatePresence>
                  {isModalOpen && (
                     <>
                        <motion.div
                           className='fixed inset-0 w-full bg-black bg-opacity-40 z-40 rounded-md'
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           onClick={toggleModal}
                        />

                        {/* Modal */}
                        <motion.div
                           className='fixed top-14 left-3 z-50 min-w-[17rem] w-fit bg-white rounded-xl text-xs font-light shadow-2xl overflow-hidden'
                           initial={{ opacity: 0, scale: 0.9, y: -20 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.9, y: -20 }}
                           transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                           <ProfileModal user={user} />
                        </motion.div>
                     </>
                  )}
               </AnimatePresence>
            </div>
         )}
      </ClerkLoaded>
   );
}

export default UserMenu;
