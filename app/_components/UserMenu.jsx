import { ClerkLoaded, SignInButton, UserButton } from '@clerk/nextjs';
import React, { useRef, useState } from 'react';
import ProfileModal from './ProfileModal';
import UserStatus from './UserStatus';

function UserMenu({ user, createClerkPasskey, className }) {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const userMenuBtnRef = useRef(null);

   const userButtonAppearance = {
      elements: {
         userButtonAvatarBox: 'w-[2.625rem] h-[2.625rem]',
      },
   };

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
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

               <ProfileModal
                  isModalOpen={isModalOpen}
                  toggleModal={toggleModal}
                  userMenuBtnRef={userMenuBtnRef}
                  user={user}
               />
            </div>
         ) : (
            <SignInButton mode='modal' />
         )}
      </ClerkLoaded>
   );
}

export default UserMenu;
