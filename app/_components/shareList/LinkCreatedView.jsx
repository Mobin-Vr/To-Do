'use client';

import illsturation from '@/public/cat.svg';
import { CopyIcon, SuccessIcon } from '@/public/icons';
import Image from 'next/image';
import { useState } from 'react';
import OrdinaryBtn from '../_ui/OrdinaryBtn';

export default function LinkCreatedView({
   onMoreOptions,
   onManageMembers,
   toggleModal,
   link,
   invitationUsers,
}) {
   const [isCopied, setIsCopied] = useState(false);

   async function copyToClipboard() {
      const textToCopy = link;

      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      setTimeout(() => {
         setIsCopied(false);
      }, 1500);
   }
   return (
      <div className='flex flex-col h-full justify-between text-sm font-light text-black'>
         <p className='w-full text-center font-normal px-2 py-3 border-b border-b-gray-300 mb-2'>
            Share list
         </p>

         <div className='p-3 border-b border-b-gray-300 flex-1 flex flex-col justify-between'>
            <div className=' flex flex-col items-center justify-center gap-8 flex-1'>
               <Image
                  src={illsturation}
                  alt='completed-task'
                  height={200}
                  width={200}
                  className='mx-auto'
               />

               <div>
                  <div className='relative flex mb-3'>
                     <input
                        readOnly
                        value={link}
                        className='inputRef px-2 py-1.5 rounded-sm bg-gray-200 text-nowrap overflow-hidden outline-none w-full h-full'
                     />

                     <button
                        onClick={copyToClipboard}
                        className='absolute right-0 font-thin text-sm h-full  aspect-square flex justify-center items-center text-white bg-gray-600 border border-gray-200 hover:bg-gray-700 rounded-sm'
                     >
                        {isCopied ? <SuccessIcon /> : <CopyIcon />}
                     </button>
                  </div>

                  <p className='px-4 text-center text-xs text-gray-700 mb-3'>
                     Anyone with this link and an account can join and edit this
                     list.
                  </p>
               </div>
            </div>

            <div className='flex gap-0.5 justify-center'>
               <OrdinaryBtn
                  onClick={onMoreOptions}
                  text='Manage access'
                  mode='secondary'
                  className='w-fit'
               />

               <OrdinaryBtn
                  onClick={onManageMembers}
                  text='Manage members'
                  mode='secondary'
                  className='w-fit flex-grow'
                  disabled={invitationUsers.length > 0 ? false : true}
               />
            </div>
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
