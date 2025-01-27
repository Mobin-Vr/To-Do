import illsturation from '@/public/completed-tasks.svg';
import { ClerkLoaded, SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Page() {
   const { userId } = await auth();

   if (userId) redirect('/tasks'); // Redirect to /tasks if signed in. Automatically returns and prevents rendering of this component

   return (
      <ClerkLoaded>
         <div className='flex justify-center items-center min-h-screen bg-gray-100  w-full text-center '>
            <div className=' max-w-xl p-10 flex flex-col gap-4 items-center justify-center'>
               <h1 className='text-4xl font-thin text-gray-700'>
                  Welcome to Microsoft To Do
               </h1>

               <div className='flex justify-center items-center'>
                  <Image
                     src={illsturation}
                     alt='completed-task'
                     className='mx-auto w-52 h-52 sm:w-64 sm:h-64'
                  />
               </div>

               <div className='w-full flex justify-center cursor-pointer'>
                  <SignInButton mode='modal' forceRedirectUrl='/tasks'>
                     <span className='w-1/2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-normal'>
                        Sign In
                     </span>
                  </SignInButton>
               </div>
            </div>
         </div>
      </ClerkLoaded>
   );
}
