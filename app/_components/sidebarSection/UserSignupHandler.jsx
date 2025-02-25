"use client";

import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect } from "react";

import { createUser, getUser } from "@/app/_lib/data-services";
import useTaskStore from "@/app/taskStore";
import { useShallow } from "zustand/react/shallow";

export default function UserSignupHandler() {
  const { user } = useUser();

  const { setUserState } = useTaskStore(
    useShallow((state) => ({
      setUserState: state.setUserState,
    })),
  );

  // Use useCallback to prevent unnecessary re-renders
  const memoized_setUserState = useCallback(
    (userState) => setUserState(userState),
    [setUserState],
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

        memoized_setUserState(newUser[0]);
      }

      if (existingUser) memoized_setUserState(existingUser);
    }

    // Call the sign-in handler and catch any errors
    handleSignIn().catch((error) => {
      console.error("Error creating user record in DB:", error);
    });
  }, [user, memoized_setUserState]);

  return null;
}
