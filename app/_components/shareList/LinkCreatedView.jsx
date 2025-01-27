import Image from 'next/image';
import OrdinaryBtn from '../_ui/OrdinaryBtn';
import illsturation from '@/public/cat.svg';

export default function LinkCreatedView({ onMoreOptions, toggleModal }) {
   function copyToClipboard() {
      const textToCopy =
         'https://to-do.microsoft.com/tasks/sharing?InvitationToken=uXh4Wvwa5-25uaZ374kxsQo3oTyLBNhbCsmXju-hJhgHdbT3i2BeuNrEb0d0unMLM'; // CHANGE LATER with real link

      navigator.clipboard.writeText(textToCopy).catch((err) => {
         console.error('Failed to copy: ', err);
      });
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
                  value='https://to-do.microsoft.com/tasks/sharing?InvitationToken=uXh4Wvwa5-25uaZ374kxsQo3oTyLBNhbCsmXju-hJhgHdbT3i2BeuNrEb0d0unMLM'
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
                     text='Copy link'
                     mode='primary'
                     className='font-thin text-sm'
                  />
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
