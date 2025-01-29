'use client';

import errorIllustration from '@/public/error.svg';
import Image from 'next/image';

export default function Error({ error, reset }) {
   return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100 w-full text-center'>
         <div className='max-w-xl p-10 flex flex-col gap-4 items-center justify-center'>
            <h1 className='text-4xl font-thin text-gray-700'>
               Oops! Something went wrong :(
            </h1>

            <div className='flex justify-center items-center'>
               <Image
                  src={errorIllustration}
                  alt='error-illustration'
                  className='mx-auto w-52 h-52 sm:w-64 sm:h-64'
               />
            </div>

            <p className='text-lg text-gray-500'>{error.message}</p>

            <div className='w-full flex justify-center cursor-pointer'>
               <button
                  onClick={reset}
                  className='w-1/2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-normal'
               >
                  Try Again
               </button>
            </div>
         </div>
      </div>
   );
}
