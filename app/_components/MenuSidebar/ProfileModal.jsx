import {
   SyncIcon,
   SettingsIcon,
   SignOutIcon,
   UserRoundCog,
} from '@/public/icons';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import UserStatus from './UserStatus';
import useTaskStore from '@/app/taskStore';

const userButtonAppearance = {
   elements: {
      userButtonAvatarBox: 'w-[4rem] h-[4rem]',
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
      <div className='w-full bg-[#d6e3ff] relative'>
         <div className='w-full h-14'>
            <div className='absolute top-6 flex flex-col items-center justify-center w-full'>
               <UserButton
                  appearance={userButtonAppearance}
                  userProfileMode={false}
               />

               <strong
                  title={user.fullName}
                  className='leading-tight text-sm font-medium text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap mt-2'
               >
                  {user.fullName}
               </strong>

               <UserStatus user={user} showIcon={false} />
            </div>
         </div>

         <div className='bg-white overflow-hidden text-black rounded-md'>
            <div className='h-24 bg-white border-b border-b-gray-100'></div>
            <div className='py-2 border-b border-gray-100 flex flex-col justify-center'>
               <Link
                  href='/profile'
                  onClick={handleManageAccClick}
                  className='py-2 px-4 flex items-center gap-3 hover:bg-accent-50'
               >
                  <UserRoundCog size='16px' />
                  <span>Manage account</span>
               </Link>

               <button
                  className='py-2 px-4 flex items-center gap-3 hover:bg-accent-50'
                  onClick={handleSettingsClick}
               >
                  <SettingsIcon size='16px' />
                  <h4>Settings</h4>
               </button>

               <SignOutButton>
                  <button className='py-2 px-4 flex items-center gap-3 hover:bg-accent-50'>
                     <SignOutIcon size='16px' />
                     <span>Sign out</span>
                  </button>
               </SignOutButton>
            </div>

            <div className='py-2 text-black'>
               <button
                  className='py-2 px-4 flex items-center gap-3 hover:bg-accent-50 w-full'
                  onClick={handleSyncingClick}
               >
                  <SyncIcon size='14px' />
                  <h4>Syncing</h4>
               </button>
            </div>
         </div>
      </div>
   );
}
