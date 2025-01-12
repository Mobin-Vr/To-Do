'use client';

import React from 'react';
import SidebarLink from './SidebarLink';
import { useUser } from '@clerk/nextjs';
import UserMenu from './UserMenu';
import { HomeIcon, InfinityIcon, SettingsIcon, SunIcon } from '@/public/icons';
import { TaskSearch } from './TaskSearch';
import useTaskStore from '../store';

const Sidebar = ({ sidebarRef }) => {
   const { user } = useUser();
   const isSidebarOpen = useTaskStore((state) => state.isSidebarOpen);

   async function createClerkPasskey() {
      try {
         await user?.createPasskey();
      } catch (err) {
         console.error('Error:', JSON.stringify(err, null, 2));
      }
   }
   return (
      <div
         ref={sidebarRef}
         className={`fixed top-0 left-0 bottom-0 w-3/5 sm:w-64 bg-gray-50 text-black py-6 px-4 transform transition-transform ease-in-out duration-300 flex-col sm:translate-x-0 z-20 h-dvh ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
         }`}
      >
         <div className='mt-7 mb-3'>
            <UserMenu user={user} createClerkPasskey={createClerkPasskey} />
         </div>

         <TaskSearch />

         {/* Sidebar links */}
         <nav className=''>
            <ul className='flex flex-col gap-1'>
               <SidebarLink href='/' title='My Day'>
                  <SunIcon />
               </SidebarLink>

               <SidebarLink href='/all' title='All'>
                  <InfinityIcon />
               </SidebarLink>

               <SidebarLink href='/tasks' title='Tasks'>
                  <HomeIcon />
               </SidebarLink>

               <SidebarLink href='/settings' title='Settings'>
                  <SettingsIcon />
               </SidebarLink>
            </ul>
         </nav>
      </div>
   );
};

export default Sidebar;
