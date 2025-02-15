import illsturation from '@/public/email.svg';
import Image from 'next/image';
import OrdinaryBtn from '../_ui/OrdinaryBtn';
import SpinnerMini from '../_ui/SpinnerMini';

export default function InitialView({ onCreateLink, toggleModal, isPending }) {
   return (
      <div className='h-full flex flex-col justify-between text-sm font-light text-black '>
         <p className='w-full text-center font-normal px-2 py-3 border-b border-b-gray-300'>
            Share list
         </p>

         <div className='px-3 border-b border-b-gray-300 flex-1 flex flex-col items-center justify-start gap-8'>
            <div className='mt-5'>
               <Image
                  src={illsturation}
                  alt='completed-task'
                  height={80}
                  width={80}
                  className='mx-auto mb-5'
               />

               <p className='text-center'>
                  Invite some people. After they join, you&apos;ll see them
                  here.
               </p>
            </div>

            <div>
               <div className='flex justify-between items-center'>
                  <OrdinaryBtn
                     onClick={onCreateLink}
                     text={`${isPending ? '' : 'Create invitation links'}`}
                     mode='secondary'
                     disabled={isPending}
                     className='font-thin w-full text-sm mb-3 flex justify-around'
                  >
                     {isPending && (
                        <span className='max-auto '>
                           <SpinnerMini />
                        </span>
                     )}
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
