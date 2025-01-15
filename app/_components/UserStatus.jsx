import { ChevronIcon } from '@/public/icons';
import { getTimeAgo } from '../_lib/utils';
import useTaskStore from '../store';

export default function UserStatus({ user }) {
   const { isConnected, isOnline, lastOnline } = useTaskStore(
      (state) => state.conectionStatus
   );

   console.log(isConnected, isOnline, lastOnline);
   const timeAgo = `Synced ${getTimeAgo(lastOnline)} ...`;

   const statusIndicator =
      isConnected && isOnline ? 'bg-green-400' : 'bg-orange-400';

   const statusText = isConnected
      ? isOnline
         ? user?.primaryEmailAddress?.emailAddress
         : timeAgo
      : "You're offline ...";

   return (
      <p
         className={`text-gray-600 leading-tight ${
            isOnline
               ? 'text-[0.715rem] font-extralight'
               : 'text-[0.7rem] font-light'
         } flex gap-1 items-center justify-center`}
      >
         <span
            className={`h-[0.4rem] w-[0.4rem] ${statusIndicator} rounded-full`}
         ></span>
         {statusText}
         {isOnline && <ChevronIcon />}
      </p>
   );
}
