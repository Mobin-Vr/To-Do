'use client';

import { ArrowIcon } from '@/public/icons';
import OrdinaryBtn from '../_ui/OrdinaryBtn';
import InvitationUsersList from './InvitationUsersList';
import useTaskStore from '@/app/taskStore';
import { useShallow } from 'zustand/react/shallow';

export default function ManageMembers({
   onBackToLinkCreated,
   toggleModal,
   invitationUsers,
   invitationId,
}) {
   const { removeUserFromInvitationStore } = useTaskStore(
      useShallow((state) => ({
         removeUserFromInvitationStore: state.removeUserFromInvitationStore,
      }))
   );

   return (
      <div className='flex flex-col h-full justify-between text-sm font-light text-black'>
         <div className='w-full text-center px-2 py-3 border-b border-b-gray-300'>
            <p className='font-normal'>Joined members</p>
            <button
               onClick={onBackToLinkCreated}
               className='transform scale-x-[-1] absolute top-2 left-2 text-gray-500 p-2'
            >
               <ArrowIcon />
            </button>
         </div>

         <div className='p-3 border-b border-b-gray-300 flex-1 flex flex-col justify-between overflow-y-scroll'>
            <InvitationUsersList
               invitationUsers={invitationUsers}
               onRemoveUser={removeUserFromInvitationStore}
               invitationId={invitationId}
            />
         </div>

         <div className='px-3 py-3 ml-auto'>
            <OrdinaryBtn
               onClick={toggleModal}
               text='Close'
               mode='primary'
               className='font-thin text-sm'
            />
         </div>
      </div>
   );
}
