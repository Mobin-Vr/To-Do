'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarLink = ({ href, title, children }) => {
   const pathname = usePathname();
   const isActive = pathname === href;

   return (
      <Link href={href}>
         <li
            className={`relative flex items-center justify-between py-2 px-3 text-gray-700 font-light text-sm hover:bg-accent-50 hover:rounded-lg transition-all duration-300 ${
               isActive ? 'bg-accent-50 rounded-lg' : ''
            }`}
         >
            <div className='flex gap-2'>
               {children}
               {title}
            </div>

            <span className='flex items-center justify-center w-4 h-4 text-xs bg-gray-200 rounded-full'>
               5
            </span>

            {isActive && (
               <div className='absolute left-0 h-[50%] border-l-[3px] rounded-xl border-blue-500'></div>
            )}
         </li>
      </Link>
   );
};

export default SidebarLink;
