import {
  SyncIcon,
  SettingsIcon,
  SignOutIcon,
  UserSettingsIcon,
} from "@/public/icons/icons";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import UserStatus from "./UserStatus";
import useTaskStore from "@/app/taskStore";

const userButtonAppearance = {
  elements: {
    userButtonAvatarBox: "w-[4rem] h-[4rem]",
  },
};

export default function ProfileModal({ user }) {
  const toggleSidebar = useTaskStore((state) => state.toggleSidebar);

  function handleManageAccClick() {
    toggleSidebar();
  }

  function handleSettingsClick() {
    toggleSidebar();
  }

  function handleSyncingClick() {
    toggleSidebar();
  }

  return (
    <div className="relative w-full bg-[#d6e3ff]">
      <div className="h-14 w-full">
        <div className="absolute top-6 flex w-full flex-col items-center justify-center">
          <UserButton
            appearance={userButtonAppearance}
            userProfileMode={false}
          />

          <strong
            title={user.fullName}
            className="mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-sm font-medium leading-tight"
          >
            {user.fullName}
          </strong>

          <UserStatus user={user} showIcon={false} />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white text-black">
        <div className="h-24 border-b border-b-gray-100 bg-white"></div>
        <div className="flex flex-col justify-center border-b border-gray-100 py-2">
          <Link
            href="/profile"
            onClick={handleManageAccClick}
            className="flex items-center gap-3 px-4 py-2 hover:bg-accent-50"
          >
            <UserSettingsIcon size="16px" />
            <span>Manage account</span>
          </Link>

          <button
            className="flex items-center gap-3 px-4 py-2 hover:bg-accent-50"
            onClick={handleSettingsClick}
          >
            <SettingsIcon size="16px" />
            <h4>Settings</h4>
          </button>

          <SignOutButton>
            <button className="flex items-center gap-3 px-4 py-2 hover:bg-accent-50">
              <SignOutIcon size="16px" />
              <span>Sign out</span>
            </button>
          </SignOutButton>
        </div>

        <div className="py-2 text-black">
          <button
            className="flex w-full items-center gap-3 px-4 py-2 hover:bg-accent-50"
            onClick={handleSyncingClick}
          >
            <SyncIcon size="16px" />
            <h4>Syncing</h4>
          </button>
        </div>
      </div>
    </div>
  );
}
