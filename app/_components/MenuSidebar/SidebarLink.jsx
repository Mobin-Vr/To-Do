'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useTaskStore from '@/app/taskStore';
import { defaultCategoryId } from '@/app/_lib/utils';
import { UsersIcon } from '@/public/icons';

const SidebarLink = ({
   href,
   title,
   children,
   categoryId,
   onClick,
   hasCollab,
}) => {
   const pathname = usePathname();
   const isActive = pathname === href;

   const tasksList = useTaskStore((state) => state.tasksList);

   function count() {
      if (!tasksList) return 0;

      if (title === 'My Day')
         return tasksList.filter((task) => task.is_task_in_mayday).length;

      if (title === 'Important')
         return tasksList.filter((task) => task.is_task_starred).length;

      if (title === 'Planned')
         return tasksList.filter((task) => task.task_due_date !== null).length;

      if (title === 'All') return 0;
      // if (title === 'All') tasksList.length; LATER CHANGE after adding new list

      if (title === 'Completed')
         return tasksList.filter((task) => task.is_task_completed).length;

      if (title === 'Tasks') return tasksList.length;

      if (categoryId !== defaultCategoryId)
         return tasksList.filter((task) => task.task_category_id === categoryId)
            .length;
   }

   return (
      <Link href={href} onClick={onClick}>
         <li
            className={`relative flex items-center justify-between py-2 px-3 text-gray-700 font-normal text-sm hover:bg-accent-50 hover:rounded-lg transition-all duration-300 ${
               isActive ? 'bg-accent-50 rounded-lg' : ''
            }`}
         >
            <div className='flex gap-2'>
               <div className='h-5 aspect-square flex items-center justify-center'>
                  {children}
               </div>
               {title}
            </div>

            <div className='flex gap-3'>
               {hasCollab && (
                  <span className='text-gray-500 ml-1'>
                     <UsersIcon size='18px' />
                  </span>
               )}

               <span className='flex items-center justify-center w-5 h-5 text-xs bg-blue-50 rounded-full text-gray-500 '>
                  <span> {count()}</span>
               </span>
            </div>
            {isActive && (
               <div className='absolute left-0 h-[50%] border-l-[3px] rounded-xl border-blue-500'></div>
            )}
         </li>
      </Link>
   );
};

export default SidebarLink;
