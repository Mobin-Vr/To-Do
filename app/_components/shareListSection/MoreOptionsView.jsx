import useTaskStore from "@/app/taskStore";
import { ArrowIcon } from "@/public/icons";
import { useShallow } from "zustand/react/shallow";
import OrdinaryBtn from "../_ui/OrdinaryBtn";
import { Switch } from "../_ui/switch";

export default function MoreOptionsView({
  onBackToLinkCreated,
  toggleModal,
  link,
  theCategoryId,
}) {
  const {
    invitations,
    setInvitationAccessLimitInStore: setLimit,
    stopSharingInvitationInStore: stopSharing,
  } = useTaskStore(
    useShallow((state) => ({
      invitations: state.invitations,
      setInvitationAccessLimitInStore: state.setInvitationAccessLimitInStore,
      stopSharingInvitationInStore: state.stopSharingInvitationInStore,
    })),
  );

  const limitAccess = invitations.find(
    (inv) => inv.invitation_category_id === theCategoryId,
  )?.invitation_limit_access;

  async function handleLimitAccess() {
    await setLimit(theCategoryId);
  }

  async function handleStopSharing() {
    await stopSharing(theCategoryId);
    toggleModal();
  }

  return (
    <div className="flex h-full flex-col justify-between text-sm font-light text-black">
      <div className="w-full border-b border-b-gray-300 px-2 py-3 text-center">
        <p className="font-normal">More options</p>
        <button
          onClick={onBackToLinkCreated}
          className="absolute left-2 top-2 scale-x-[-1] transform p-2 text-gray-500"
        >
          <ArrowIcon />
        </button>
      </div>

      <div className="w-full border-b border-b-gray-300 px-3 py-4">
        <div className="mb-1 flex w-full items-center justify-between">
          <p className="self-center">Limit access to current members</p>
          <Switch
            checked={limitAccess}
            onCheckedChange={handleLimitAccess}
            id="airplane-mode"
            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-500"
          />
        </div>

        <p className="text-xs text-gray-700">
          Toggle to prevent joining new people.
        </p>
      </div>

      <div className="w-full flex-1 border-b border-b-gray-300 px-3 py-4">
        <p className="mb-2">Invitation link</p>
        <span className="text-xs text-gray-700">{link}</span>
      </div>

      <div className="w-full px-3 py-3">
        <OrdinaryBtn
          onClick={handleStopSharing}
          text="Stop sharing"
          mode="warn"
          className="w-full text-sm font-thin"
        />
      </div>
    </div>
  );
}
