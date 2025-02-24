"use client";

import illsturation from "@/public/icons/cat.svg";
import { CopyIcon, SuccessIcon } from "@/public/icons/icons";
import Image from "next/image";
import { useState } from "react";
import OrdinaryBtn from "../_ui/OrdinaryBtn";

export default function LinkCreatedView({
  onMoreOptions,
  onManageMembers,
  toggleModal,
  link,
  invitationUsers,
}) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyToClipboard() {
    const textToCopy = link;

    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }
  return (
    <div className="flex h-full flex-col justify-between text-sm font-light text-black">
      <p className="mb-2 w-full border-b border-b-gray-300 px-2 py-3 text-center font-normal">
        Share list
      </p>

      <div className="flex flex-1 flex-col justify-between border-b border-b-gray-300 p-3">
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <Image
            src={illsturation}
            alt="completed-task"
            height={200}
            width={200}
            className="mx-auto"
          />

          <div>
            <div className="relative mb-3 flex rounded-md bg-gray-200">
              <input
                readOnly
                value={link}
                className="inputRef h-full w-[calc(100%-28px)] overflow-hidden text-nowrap rounded-l-md bg-gray-200 px-2 py-1.5 outline-none"
              />

              <button
                onClick={copyToClipboard}
                title="Copy link"
                className="absolute right-0 flex aspect-square h-full items-center justify-center rounded-r-md border-l-2 border-l-white bg-gray-200 text-sm font-thin text-black duration-200 hover:bg-gray-500 hover:text-white"
              >
                {isCopied ? <SuccessIcon /> : <CopyIcon size="14" />}
              </button>
            </div>

            <p className="mb-3 px-4 text-center text-xs text-gray-700">
              Anyone with this link and an account can join and edit this list.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-0.5 xs:flex-row">
          <OrdinaryBtn
            onClick={onMoreOptions}
            text="Manage access"
            mode="secondary"
            className="w-full xs:w-fit"
          />

          <OrdinaryBtn
            onClick={onManageMembers}
            text="Manage members"
            mode="secondary"
            className="w-full xs:w-fit xs:flex-grow"
            disabled={invitationUsers.length > 0 ? false : true}
            title={invitationUsers.length > 0 ? "" : "No one has joined yet!"}
          />
        </div>
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
