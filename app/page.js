'use client';

import { useEffect, useRef } from 'react';
import Template from './_components/Template';
import useTaskStore from './store';
import { BG_COLORS } from '@/app/_lib/utils';
import { usePathname } from 'next/navigation';

export default function Page() {
   const pathname = usePathname();
   const bgColor = BG_COLORS[pathname];

   const listConfig = {
      bgColor,
      listName: 'My Day',
      listIcon: '',
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
