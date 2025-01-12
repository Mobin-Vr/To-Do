'use client';

import { useEffect, useRef } from 'react';
import useTaskStore from '../store';
import Template from '../_components/Template';
import { BG_COLORS } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Page() {
   const pathname = usePathname();
   const bgColor = BG_COLORS[pathname];

   const taskList = useTaskStore((state) => state.taskList);
   const listRef = useRef(null);

   useEffect(() => {
      if (listRef.current) {
         listRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [taskList.length]);

   return <Template listRef={listRef} bgColor={bgColor} />;
}
