'use client';

import { BG_COLORS } from '@/app/_lib/utils';
import { InfinityIcon } from '@/public/icons';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Template from '../../_components/_ui/Template';
import useTaskStore from '../../taskStore';

export default function Page() {
   const pathname = usePathname();
   const bgColor = BG_COLORS[pathname];

   const listConfig = {
      bgColor,
      listName: 'All',
      listIcon: <InfinityIcon size='24px' color={bgColor[3]} />,
   };

   const tasksList = useTaskStore((state) => state.tasksList);
   const listRef = useRef(null);

   useEffect(() => {
      if (listRef.current) {
         listRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [tasksList.length]);

   return <Template listRef={listRef} listConfig={listConfig} />;
}
