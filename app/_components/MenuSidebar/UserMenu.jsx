import { ClerkLoaded, SignInButton, UserButton } from '@clerk/nextjs';
import React, { useRef, useState } from 'react';
import ProfileModal from './ProfileModal';
import UserStatus from './UserStatus';
import ModalTemplate from '../_ui/ModalTemplate';

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
         {user ? (
            <div
               className={`flex items-center space-x-3 relative ${className}`}
            >
               {/* NOTE Actually it is user profile */}
               <UserButton appearance={userButtonAppearance} />

               <button
                  className='flex flex-col overflow-hidden'
                  onClick={toggleModal}
                  ref={userMenuBtnRef}
               >
                  <p className='leading-tight text-sm font-normal'>
                     {user.fullName}
                  </p>

                  <UserStatus user={user} />
               </button>

               <ModalTemplate
                  parentRef={userMenuBtnRef}
                  isModalOpen={isModalOpen}
                  toggleModal={toggleModal}
                  className='top-12 left-0 w-52 -translate-x-3 text-xs font-normal'
               >
                  <ProfileModal />
               </ModalTemplate>
            </div>
         ) : (
            <SignInButton mode='modal' />
         )}
      </ClerkLoaded>
   );
}

export default UserMenu;
