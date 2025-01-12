// components/Modal.js
import { RefreshCw, SettingsIcon, UserRoundCog } from '@/public/icons';
import { useEffect, useRef } from 'react';

function ProfileModal({ isModalOpen, toggleModal, user }) {
   const modalRef = useRef(null);

   useEffect(() => {
      if (isModalOpen) {
         const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
               toggleModal();
            }
         };

         document.addEventListener('mousedown', handleClickOutside);

         return () => {
            document.removeEventListener('mousedown', handleClickOutside);
         };
      }
   }, [isModalOpen, toggleModal]);

   if (!isModalOpen) return null;

   return (
      <div
         ref={modalRef}
         className='absolute transform -translate-x-3 top-16 w-full bg-white p-0 rounded-lg shadow-lg flex flex-col z-50 overflow-hidden'
      >
         <div className='py-4 px-6 border-b border-gray-200 flex gap-4 hover:bg-accent-50'>
            <UserRoundCog />
            <h4>Manage accounts</h4>
         </div>

         <div className='py-4 px-6 border-b border-gray-200 flex gap-4 hover:bg-accent-50'>
            <SettingsIcon />
            <h4>Settings</h4>
         </div>

         <div className='py-4 px-6 flex gap-4 hover:bg-accent-50'>
            <RefreshCw />
            <h4>Syncing</h4>
         </div>
      </div>
   );
}

export default ProfileModal;
