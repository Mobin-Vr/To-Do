import React from 'react';
import { ChevronIcon } from '@/public/icons';
import { getTimeAgo } from '../_lib/utils';
import useDBHealth from '../_lib/hooks/useDBHealth';

export default function UserStatus({ user }) {
   const { isOnline, lastOnline, isConnected } = useDBHealth();
   const timeAgo = `Synced ${getTimeAgo(lastOnline)} ...`;

   const statusIndicator = isOnline ? 'bg-green-400' : 'bg-orange-400';

   const statusText = isOnline
      ? user?.primaryEmailAddress?.emailAddress
      : isConnected
      ? timeAgo
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
