import illsturation from '@/public/pnf.svg';
import Image from 'next/image';
import Link from 'next/link';

function NotFound() {
   return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100 w-full text-center'>
         <div className='max-w-xl p-10 flex flex-col gap-4 items-center justify-center'>
            <h1 className='text-4xl font-thin text-gray-700'>
               This list could not be found :(
            </h1>

            <div className='flex justify-center items-center'>
               <Image
                  src={illsturation}
                  alt='not-found'
                  className='mx-auto w-52 h-52 sm:w-64 sm:h-64'
               />
            </div>

            <div className='w-full flex justify-center cursor-pointer'>
               <Link
                  href='/tasks'
                  className='w-1/2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-normal'
               >
                  Back to tasks
               </Link>
            </div>
         </div>
      </div>
   );
}

export default NotFound;
