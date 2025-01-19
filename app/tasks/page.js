'use client';

import { useEffect, useRef } from 'react';
import useTaskStore from '../store';
import Template from '../_components/Template';
import { BG_COLORS } from '@/app/_lib/utils';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '@/public/icons';

export default function Page() {
   const pathname = usePathname();
   const bgColor = BG_COLORS[pathname];

   const listConfig = {
      bgColor,
      listName: 'Tasks',
      listIcon: <HomeIcon size='24px' color={bgColor[3]} />,
   };

   const TasksList = useTaskStore((state) => state.TasksList);
   const listRef = useRef(null);

   useEffect(() => {
      if (listRef.current) {
         listRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [TasksList.length]);

   return <Template listRef={listRef} listConfig={listConfig} />;
}
