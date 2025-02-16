'use client';

import {
   HomeIcon,
   InfinityIcon,
   MenuStarIcon,
   SunIcon,
   TickCircleIcon,
   TodayCalendarIcon,
   WeeklyIcon,
} from '@/public/icons';
import SidebarLink from './SidebarLink';

export default function SidebarNav({ tasksList, toggleSidebar }) {
   const isThereImportant = tasksList.find((task) => task.is_task_starred);
   const isThereCompleted = tasksList.find((task) => task.is_task_completed);
   const isTherePlanned = tasksList.find((task) => task.task_due_date);

   return (
      <ul className='flex flex-col gap-1 border-b pb-2'>
         <SidebarLink
            href='/tasks/my-day'
            title='My Day'
            onClick={toggleSidebar}
         >
            <span className='text-yellow-600'>
               <SunIcon />
            </span>
         </SidebarLink>

         {isThereImportant && (
            <SidebarLink
               href='/tasks/important'
               title='Important'
               onClick={toggleSidebar}
            >
               <span className='text-red-600'>
                  <MenuStarIcon size='19' />
               </span>
            </SidebarLink>
         )}

         {isTherePlanned && (
            <SidebarLink
               href='/tasks/planned'
               title='Planned'
               onClick={toggleSidebar}
            >
               <span className='text-green-600'>
                  <WeeklyIcon />
               </span>
            </SidebarLink>
         )}

         <SidebarLink href='/tasks/all' title='All' onClick={toggleSidebar}>
            <span className='text-red-600'>
               <InfinityIcon />
            </span>
         </SidebarLink>

         {isThereCompleted && (
            <SidebarLink
               href='/tasks/completed'
               title='Completed'
               onClick={toggleSidebar}
            >
               <span className='text-red-600'>
                  <TickCircleIcon size='19' />
               </span>
            </SidebarLink>
         )}

         <SidebarLink href='/tasks' title='Tasks' onClick={toggleSidebar}>
            <span className='text-blue-600'>
               <HomeIcon size='19' />
            </span>
         </SidebarLink>
      </ul>
   );
}
