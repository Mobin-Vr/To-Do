'use client';

import { HomeIcon } from '@/public/icons';
import { useEffect, useRef } from 'react';
import Template from '../_components/_ui/Template';
import { BG_COLORS, defaultCategoryId } from '../_lib/utils';
import useTaskStore from '../taskStore';

export default function Page() {
   const categoriesList = useTaskStore((state) => state.categoriesList);

   const theCategory = categoriesList?.find(
      (cat) => cat.category_id === defaultCategoryId
   );

   const bgColor = BG_COLORS['/tasks'];

   const listConfig = {
      bgColor,
      listName: 'Tasks',
      listIcon: <HomeIcon size='32px' color={bgColor[3]} />,
      theCategory,
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
