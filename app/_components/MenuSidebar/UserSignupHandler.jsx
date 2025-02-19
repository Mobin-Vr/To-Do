"use client";

import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect } from "react";

import { createUser, getUser } from "@/app/_lib/data-services";
import useTaskStore from "@/app/taskStore";

export default function UserSignupHandler() {
  const { user } = useUser();

  const setuserState = useTaskStore((state) => state.setuserState);

  // Use useCallback to prevent unnecessary re-renders
  const memoized_setuserState = useCallback(
    (userState) => setuserState(userState),
    [setuserState],
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

        memoized_setuserState(newUser[0]);
      }

      if (existingUser) memoized_setuserState(existingUser);
    }

    // Call the sign-in handler and catch any errors
    handleSignIn().catch((error) => {
      console.error("Error creating user record in DB:", error);
    });
  }, [user, memoized_setuserState]);

  return null;
}
