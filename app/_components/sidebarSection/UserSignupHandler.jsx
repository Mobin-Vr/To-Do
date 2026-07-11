"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import useUserStore from "@/app/_store/useUserStore";
import { useShallow } from "zustand/react/shallow";
import { createUserAction } from "@/app/_lib/Actions";

export default function UserSignupHandler() {
  const { user } = useUser();
  const { setUserState } = useUserStore(
    useShallow((state) => ({ setUserState: state.setUserState })),
  );

  useEffect(() => {
    async function handleSignIn() {
      if (!user) return;
      const email = user.emailAddresses[0].emailAddress;

      const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
      let existingUser = null;
      if (res.ok) {
        existingUser = await res.json();
      }

      let userState;
      if (!existingUser) {
        const newUser = await createUserAction({
          user_fullname: user.fullName,
          user_email: email,
          user_clerk_id: user.id,
        });
        userState = newUser[0];
      } else {
        userState = existingUser;
      }

      setUserState(userState);
    }

    handleSignIn().catch((error) => {
      console.error("Error creating user record in DB:", error);
    });
  }, [user, setUserState]);

  return null;
}
