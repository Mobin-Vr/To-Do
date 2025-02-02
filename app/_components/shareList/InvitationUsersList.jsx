import { XIcon } from '@/public/icons';

export default function InvitationUsersList({
   invitationUsers,
   onRemoveUser,
   invitationId,
}) {
   console.log('111: ', invitationId);

   return (
      <ul className='py-1.5 divide-y rounded-lg flex flex-col'>
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
      <li className='flex gap-3 px-1 py-2 items-center justify-start'>
         <span className='h-4 w-4 rounded-full bg-accent-200 flex items-center justify-center text-xs text-blue-800 select-none'>
            {number}
         </span>

         <div className='flex-1 text-xs items-center overflow-hidden flex gap-1'>
            <p
               className='text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap'
               title={user.user_fullname}
            >
               {user.user_fullname}
            </p>

            <p
               className='text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap text-gray-500'
               title={user.user_email}
            >
               {user.user_email}
            </p>
         </div>

         <button
            onClick={() => onRemoveUser(invitationId, user.user_id)}
            className='flex items-center justify-center ml-auto hover:bg-gray-300 h-full aspect-square p-1 rounded-sm text-red-600'
         >
            <XIcon />
         </button>
      </li>
   );
}
