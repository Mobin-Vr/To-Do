// components/UserMenu.js
import { ClerkLoaded, SignInButton, UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import { ChevronIcon } from '@/public/icons';

function UserMenu({ user, createClerkPasskey }) {
   const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className='flex items-center space-x-3 relative'>
               <UserButton appearance={userButtonAppearance} />

               <button className='flex flex-col' onClick={toggleModal}>
                  <p className='leading-tight text-sm font-normal'>
                     {user.fullName}
                  </p>

                  <p className='text-gray-600 leading-tight text-[0.715rem] font-extralight flex gap-1 items-center justify-center'>
                     {user?.primaryEmailAddress?.emailAddress}
                     <ChevronIcon />
                  </p>
               </button>

               {/* Pass the necessary props to the Modal component */}
               <ProfileModal
                  isModalOpen={isModalOpen}
                  toggleModal={toggleModal}
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
