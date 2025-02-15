'use client';

import Image from 'next/image';
import taskIllustration from '@/public/nature.svg';

export default function NoTaskInMyDay() {
   return (
      <div className='w-full h-full flex justify-center items-center'>
         <div className='h-fit w-fit bg-inherit text-center flex flex-col gap-4 -translate-y-10'>
            <div className='flex justify-center items-center'>
               <Image
                  src={taskIllustration}
                  alt='task-illustration'
                  className='mx-auto w-32 h-32'
               />
            </div>

            <div>
               <h1 className='text-xl font-medium text-gray-700 mb-1'>
                  Focus on your day
               </h1>

               <p className='text-sm text-gray-500'>
                  Get things done with My Day, a list
                  <br />
                  that refreshes every day.
               </p>
            </div>
         </div>
      </div>
   );
}
