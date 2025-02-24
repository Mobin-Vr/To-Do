import illsturation from "@/public/icons/email.svg";
import Image from "next/image";
import OrdinaryBtn from "../_ui/OrdinaryBtn";
import SpinnerMini from "../_ui/SpinnerMini";

export default function InitialView({ onCreateLink, toggleModal, isPending }) {
  return (
    <div className="flex h-full flex-col justify-between text-sm font-light text-black">
      <p className="w-full border-b border-b-gray-300 px-2 py-3 text-center font-normal">
        Share list
      </p>

      <div className="flex flex-1 flex-col items-center justify-start gap-8 border-b border-b-gray-300 px-3">
        <div className="mt-5">
          <Image
            src={illsturation}
            alt="completed-task"
            height={80}
            width={80}
            className="mx-auto mb-5"
          />

          <p className="text-center">
            Invite some people. After they join, you&apos;ll see them here.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <OrdinaryBtn
              onClick={onCreateLink}
              text={`${isPending ? "" : "Create invitation links"}`}
              mode="secondary"
              disabled={isPending}
              className="mb-3 flex h-[1.875rem] w-full justify-around text-sm font-thin"
            >
              {isPending && (
                <span className="max-auto">
                  <SpinnerMini />
                </span>
              )}
            </OrdinaryBtn>
          </div>

          <p className="px-4 text-center text-xs text-gray-700">
            Anyone with this link and an account can join and edit this list.
          </p>
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
