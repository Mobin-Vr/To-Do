'use client';

import illsturation from '@/public/cat.svg';
import Image from 'next/image';
import { useState } from 'react';
import OrdinaryBtn from '../_ui/OrdinaryBtn';

export default function LinkCreatedView({ onMoreOptions, toggleModal, link }) {
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
         <p className='w-full text-center font-normal px-2 py-3 border-b border-b-gray-300'>
            Share list
         </p>

         <div className='px-3 border-b border-b-gray-300 flex-1 flex flex-col items-center justify-center gap-8'>
            <Image
               src={illsturation}
               alt='completed-task'
               height={200}
               width={200}
               className='mx-auto'
            />

            <p className='text-center'>
               New members haven&apos;t joined yet. Once they do, you&apos;ll
               see them here.
            </p>

            <div>
               <input
                  readOnly
                  value={link}
                  className='inputRef px-2 py-1.5 rounded-sm bg-gray-200 mb-3 text-nowrap overflow-hidden w-full outline-none'
               ></input>

               <div className='mb-3 flex gap-1'>
                  <OrdinaryBtn
                     onClick={onMoreOptions}
                     text='Manage access'
                     mode='secondary'
                     className='flex-1'
                  />

                  <OrdinaryBtn
                     onClick={copyToClipboard}
                     text={isCopied ? '' : 'Copy'}
                     mode='primary'
                     className='font-thin text-sm w-16 flex justify-center items-center'
                  >
                     <span>
                        {isCopied && (
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4 text-blue-600'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth={2}
                                 d='M5 13l4 4L19 7'
                              />
                           </svg>
                        )}
                     </span>
                  </OrdinaryBtn>
               </div>
               <p className='px-4 text-center text-xs text-gray-700'>
                  Anyone with this link and an account can join and edit this
                  list.
               </p>
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
