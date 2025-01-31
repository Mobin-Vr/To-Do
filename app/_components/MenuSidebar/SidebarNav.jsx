'use client';

import {
   HomeIcon,
   InfinityIcon,
   MenuStarIcon,
   SunIcon,
   TickCircleIcon,
   TodayCalendarIcon,
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
            <SunIcon />
         </SidebarLink>

         {isThereImportant && (
            <SidebarLink
               href='/tasks/important'
               title='Important'
               onClick={toggleSidebar}
            >
               <MenuStarIcon color='#ac395d' size='20px' />
            </SidebarLink>
         )}

         {isTherePlanned && (
            <SidebarLink
               href='/tasks/planned'
               title='Planned'
               onClick={toggleSidebar}
            >
               <TodayCalendarIcon color='#166f6b' size='18px' />
            </SidebarLink>
         )}

         <SidebarLink href='/tasks/all' title='All' onClick={toggleSidebar}>
            <InfinityIcon />
         </SidebarLink>

         {isThereCompleted && (
            <SidebarLink
               href='/tasks/completed'
               title='Completed'
               onClick={toggleSidebar}
            >
               <TickCircleIcon color='#c5514c' />
            </SidebarLink>
         )}

         <SidebarLink href='/tasks' title='Tasks' onClick={toggleSidebar}>
            <HomeIcon />
         </SidebarLink>
      </ul>
   );
}
