'use client';

import useCustomToast from '@/app/_lib/useCustomeToast';
import useTaskStore from '@/app/taskStore';
import illsturation_login from '@/public/login.svg';
import illsturation from '@/public/team.svg';
import { SignInButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

export default function InvitationLandingContent({ token }) {
   const showToast = useCustomToast();
   const { user } = useUser();

   const { joinInvitationInStore, getSharedWithMe } = useTaskStore(
      useShallow((state) => ({
         joinInvitationInStore: state.joinInvitationInStore,
         getSharedWithMe: state.getSharedWithMe,
      }))
   );

   async function handleJoin() {
      const wasSuccessful = await joinInvitationInStore(token);

      if (!wasSuccessful.status) showToast(wasSuccessful.message);

      if (wasSuccessful.status) {
         const categoryId = getSharedWithMe().find(
            (arr) => arr.invitation_id === token
         )?.invitation_category_id;

         redirect(`/tasks/${categoryId}`);
      }
   }

   return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100 w-full text-center'>
         <div className='max-w-xl p-10 flex flex-col gap-6 items-center justify-center'>
            <h1 className='text-4xl font-thin text-gray-700'>
               List Invitation
            </h1>
            <p className='text-xl text-gray-600'>
               You&apos;re invited to join a shared task list.
            </p>

            <div className='flex justify-center items-center'>
               <Image
                  src={user ? illsturation : illsturation_login}
                  alt='invitation-illustration'
                  className='mx-auto w-52 h-52 sm:w-64 sm:h-64'
               />
            </div>

            <div className='w-full flex justify-center'>
               {user ? (
                  <button
                     onClick={handleJoin}
                     className='w-1/2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-normal'
                  >
                     Join to the list
                  </button>
               ) : (
                  <div className='flex flex-col w-full items-center justify-center gap-3'>
                     <SignInButton
                        mode='modal'
                        className='w-1/2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-normal cursor-pointer'
                        forceRedirectUrl={`/tasks/invite?token=${token}`}
                     />

                     <span className='text-sm text-gray-600 px-10'>
                        You don&apos;t have an account. <br />
                        Sign in / up first.
                     </span>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
