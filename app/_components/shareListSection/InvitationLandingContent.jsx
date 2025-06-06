"use client";

import useTaskStore from "@/app/taskStore";
import illsturation_login from "@/public/icons/login.svg";
import illsturation from "@/public/icons/team.svg";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useShallow } from "zustand/react/shallow";
import SpinnerMini from "../_ui/SpinnerMini";
import { useState, useEffect } from "react";

export default function InvitationLandingContent({ token }) {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const { joinInvitationInStore } = useTaskStore(
    useShallow((state) => ({
      joinInvitationInStore: state.joinInvitationInStore,
    })),
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This ensures client-side rendering
  }, []);

  async function handleJoin() {
    startTransition(async () => {
      const res = await joinInvitationInStore(token);

      if (res.status === true) redirect(`/tasks/${res.categoryId}`);
    });
  }

  if (!user) return null;

  // Only render content when on the client
  if (!isClient) return null;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 text-center">
      <div className="flex max-w-xl flex-col items-center justify-center gap-6 p-10">
        <h1 className="text-4xl font-thin text-gray-700">List Invitation</h1>
        <p className="text-xl text-gray-600">
          You&apos;re invited to join a shared task list.
        </p>

        <div className="flex items-center justify-center">
          <Image
            src={user ? illsturation : illsturation_login}
            alt="invitation-illustration"
            className="mx-auto h-52 w-52 sm:h-64 sm:w-64"
          />
        </div>

        <div className="flex w-full justify-center">
          {user ? (
            <button
              disabled={isPending}
              onClick={handleJoin}
              className={`flex h-10 w-1/2 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-center font-normal text-white transition hover:bg-blue-700 ${
                isPending
                  ? "cursor-not-allowed border-2 border-gray-400 bg-gray-300 hover:bg-gray-300"
                  : ""
              }`}
            >
              {isPending ? (
                <span>
                  <SpinnerMini />
                </span>
              ) : (
                "Join to the list"
              )}
            </button>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <SignInButton
                mode="modal"
                className="w-1/2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-center font-normal text-white transition hover:bg-blue-700"
                forceRedirectUrl={`/tasks/invite?token=${token}`}
              />

              <span className="select-none px-10 text-sm text-gray-600">
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
