import { RefreshCw, SettingsIcon, UserRoundCog } from '@/public/icons';
import { useEffect, useRef } from 'react';

function ProfileModal({ isModalOpen, toggleModal, userMenuBtnRef, user }) {
   const modalRef = useRef(null);

   useEffect(() => {
      if (isModalOpen) {
         const handleClickOutside = (event) => {
            if (
               modalRef.current &&
               !modalRef.current.contains(event.target) &&
               !userMenuBtnRef.current.contains(event.target)
            ) {
               toggleModal();
            }
         };

         document.addEventListener('mousedown', handleClickOutside);

         return () =>
            document.removeEventListener('mousedown', handleClickOutside);
      }
   }, [isModalOpen, toggleModal, userMenuBtnRef]);

   if (!isModalOpen) return null;

   return (
      <div
         ref={modalRef}
         className='absolute top-12 left-0 w-52 -translate-x-3 bg-white rounded-sm shadow-2xl flex flex-col z-50 text-sm font-normal text-gray-600'
      >
         <div className='py-2.5 px-3 border-b border-gray-100 flex gap-4 hover:bg-accent-50'>
            <UserRoundCog size='18px' />
            <h4>Manage accounts</h4>
         </div>

         <div className='py-2.5 px-3 border-b border-gray-100 flex gap-4 hover:bg-accent-50'>
            <RefreshCw size='18px' />
            <h4>Syncing</h4>
         </div>

         <div className='py-2.5 px-3 flex gap-4 hover:bg-accent-50'>
            <SettingsIcon size='18px' />
            <h4>Settings</h4>
         </div>
      </div>
   );
}

export default ProfileModal;
