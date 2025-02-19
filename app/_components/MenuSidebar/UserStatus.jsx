import { ChevronIcon } from "@/public/icons";
import { getTimeAgo } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";

export default function UserStatus({ user, showIcon = true }) {
  const { isConnected, isOnline, lastOnline } = useTaskStore(
    (state) => state.conectionStatus,
  );

  const timeAgo = lastOnline
    ? `Synced ${getTimeAgo(lastOnline)} ...`
    : "You're offline ...";

  const statusIndicator =
    isConnected && isOnline ? "bg-green-400" : "bg-orange-400";

  const statusText = isConnected
    ? isOnline
      ? user?.primaryEmailAddress?.emailAddress
      : timeAgo
    : "You're offline ...";

  return (
    <p
      title={isOnline ? user?.primaryEmailAddress?.emailAddress : ""}
      className={`leading-tight text-gray-500 ${
        isOnline
          ? "text-[0.715rem] font-extralight"
          : "text-[0.7rem] font-light"
      } flex items-center justify-center gap-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap`}
    >
      <span
        className={`h-[0.5rem] w-[0.5rem] ${statusIndicator} rounded-full`}
      ></span>

      {statusText}
      {isOnline && showIcon && <ChevronIcon />}
    </p>
  );
}
