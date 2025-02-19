"use client";

import { ArrowIcon } from "@/public/icons";
import OrdinaryBtn from "../_ui/OrdinaryBtn";
import InvitationUsersList from "./InvitationUsersList";
import useTaskStore from "@/app/taskStore";
import { useShallow } from "zustand/react/shallow";

export default function ManageMembers({
  onBackToLinkCreated,
  toggleModal,
  invitationUsers,
  invitationId,
}) {
  const { removeUserFromInvitationStore } = useTaskStore(
    useShallow((state) => ({
      removeUserFromInvitationStore: state.removeUserFromInvitationStore,
    })),
  );

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
        <InvitationUsersList
          invitationUsers={invitationUsers}
          onRemoveUser={removeUserFromInvitationStore}
          invitationId={invitationId}
        />
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
