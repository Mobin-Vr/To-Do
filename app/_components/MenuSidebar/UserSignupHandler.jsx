'use client';

import { useCallback, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

import { createUser, getUser } from '@/app/_lib/data-services';
import useTaskStore from '@/app/taskStore';

export default function UserSignupHandler() {
   const { user } = useUser();
   const setUserInfo = useTaskStore((state) => state.setUserInfo);

   // Use useCallback to prevent unnecessary re-renders
   const memoized_setUserInfo = useCallback(
      (userInfo) => setUserInfo(userInfo),
      [setUserInfo]
   );

   useEffect(() => {
      async function handleSignIn() {
         // If no user is logged in, do nothing
         if (!user) return;

         const email = user.emailAddresses[0].emailAddress;

         const existingUser = await getUser(email);

         // If the user doesn't exist, create a new user and store their data in the store
         if (!existingUser) {
            const newUser = await createUser({
               user_fullname: user.fullName,
               user_email: email,
               user_clerk_id: user.id,
            });

            memoized_setUserInfo(newUser[0]);
         }

         if (existingUser) memoized_setUserInfo(existingUser);
      }

      // Call the sign-in handler and catch any errors
      handleSignIn().catch((error) => {
         console.error('Error creating user record in DB:', error);
      });
   }, [user, memoized_setUserInfo]);

   return null;
}
