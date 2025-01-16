'use client';

import React from 'react';
import SidebarLink from './SidebarLink';
import { HomeIcon, InfinityIcon, SettingsIcon, SunIcon } from '@/public/icons';

export default function SidebarNav() {
   return (
      <nav>
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
   );
}
