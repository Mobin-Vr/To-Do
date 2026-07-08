"use client";

import useTaskStore from "@/app/taskStore";
import illsturation from "@/public/icons/team.svg";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import SpinnerMini from "../_ui/SpinnerMini";
import Spinner from "../_ui/Spinner";

export default function InvitationLandingContent({ token }) {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  const router = useRouter();

  const { joinInvitationInStore } = useTaskStore(
    useShallow((state) => ({
      joinInvitationInStore: state.joinInvitationInStore,
    })),
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This ensures client-side rendering
  }, []);

  // Redirect to log-in, then back to this exact page, if not signed in
  useEffect(() => {
    if (!isClient) return;
    if (user) return;

    const returnUrl = `/tasks/invite?token=${encodeURIComponent(token)}`;
    router.push(`/log-in?redirect_url=${encodeURIComponent(returnUrl)}`);
  }, [isClient, user, token, router]);

  async function handleJoin() {
    startTransition(async () => {
      const res = await joinInvitationInStore(token);

      if (res.status === true) redirect(`/tasks/${res.categoryId}`);
    });
  }

  // Not on client yet, or not signed in (redirect effect above handles navigation)
  if (!isClient || !user) return <Spinner />;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 text-center">
      <div className="flex max-w-xl flex-col items-center justify-center gap-6 p-10">
        <h1 className="text-4xl font-thin text-gray-700">List Invitation</h1>
        <p className="text-xl text-gray-600">
          You&apos;re invited to join a shared task list.
        </p>

        <div className="flex items-center justify-center">
          <Image
            src={illsturation}
            alt="invitation-illustration"
            className="mx-auto h-52 w-52 sm:h-64 sm:w-64"
          />
        </div>

        <div className="flex w-full justify-center">
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
        </div>
      </div>
    </div>
  );
}
