import { XIcon } from "@/public/icons/icons";

export default function InvitationUsersList({
  invitationUsers,
  onRemoveUser,
  invitationId,
}) {
  return (
    <ul className="flex flex-col divide-y rounded-md py-1.5">
      {invitationUsers.map((user, i) => (
        <User
          key={user.user_id}
          number={i + 1}
          user={user}
          onRemoveUser={onRemoveUser}
          invitationId={invitationId}
        />
      ))}
    </ul>
  );
}

function User({ number, user, onRemoveUser, invitationId }) {
  return (
    <li className="flex items-center justify-start gap-3 px-1 py-2">
      <span className="flex h-4 w-4 select-none items-center justify-center rounded-full bg-accent-200 text-xs text-blue-800">
        {number}
      </span>

      <div className="flex flex-1 items-center gap-1 overflow-hidden text-xs">
        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap"
          title={user.user_fullname}
        >
          {user.user_fullname}
        </p>

        <p
          className="overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-gray-500"
          title={user.user_email}
        >
          {user.user_email}
        </p>
      </div>

      <button
        onClick={() => onRemoveUser(invitationId, user.user_id)}
        className="ml-auto flex aspect-square h-full items-center justify-center rounded-md p-1 text-red-600 hover:bg-gray-300"
      >
        <XIcon />
      </button>
    </li>
  );
}
