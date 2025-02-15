'use client';

import NoResults from '@/app/_components/NoResults';
import Template from '@/app/_components/Template';
import { BG_COLORS } from '@/app/_lib/configs';
import useTaskStore from '@/app/taskStore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function Page({}) {
   const listRef = useRef(null);
   const query = useSearchParams().get('query');

   const bgColor = BG_COLORS['/search'];

   const { tasksList } = useTaskStore(
      useShallow((state) => ({
         tasksList: state.tasksList,
      }))
   );

   const tasks = tasksList.filter((task) =>
      task.task_title.toLowerCase().includes(query.toLowerCase())
   );

   useEffect(() => {
      if (listRef.current) {
         listRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [tasksList.length]);

   const listConfig = {
      bgColor,
      listName: 'Search',
      listIcon: '',
      tasks,
      query,
   };

   return (
      <>
         {tasks.length > 0 ? (
            <Template
               listRef={listRef}
               listConfig={listConfig}
               showInput={false}
            />
         ) : (
            <NoResults query={query} bgColor={bgColor} />
         )}
      </>
   );
}
