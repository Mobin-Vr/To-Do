"use client";

import { ArrowIcon } from "@/public/icons/icons";
import OrdinaryBtn from "@/app/_components/_ui/OrdinaryBtn";
import InvitationUsersList from "./InvitationUsersList";
import useInvitationStore from "@/app/_store/useInvitationStore";
import useUserStore from "@/app/_store/useUserStore";
import { useShallow } from "zustand/react/shallow";

export default function ManageMembers({
  onBackToLinkCreated,
  toggleModal,
  invitationUsers,
  invitationId,
}) {
  const { removeUserFromInvitationStore } = useInvitationStore(
    useShallow((state) => ({
      removeUserFromInvitationStore: state.removeUserFromInvitationStore,
    })),
  );

  // Get current user's ID to filter out the owner from the member list
  const ownerId = useUserStore((state) => state.userState?.user_id);

  // Only show members who are not the owner
  const members = invitationUsers.filter((user) => user.user_id !== ownerId);

  return (
    <div className="flex h-full flex-col justify-between text-sm font-light text-black">
      <div className="w-full border-b border-b-gray-300 px-2 py-3 text-center">
        <p className="font-normal">Joined members</p>

        <button
          onClick={onBackToLinkCreated}
          className="absolute left-2 top-2 scale-x-[-1] transform p-2 text-gray-500"
        >
          <ArrowIcon />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-scroll border-b border-b-gray-300 p-3">
        {members.length > 0 ? (
          <InvitationUsersList
            invitationUsers={members}
            onRemoveUser={removeUserFromInvitationStore}
            invitationId={invitationId}
          />
        ) : (
          <p className="py-4 text-center text-gray-400">
            No other members yet.
          </p>
        )}
      </div>

      <div className="ml-auto px-3 py-3">
        <OrdinaryBtn
          onClick={toggleModal}
          text="Close"
          mode="primary"
          className="text-sm font-thin"
        />
      </div>
    </div>
  );
}
