'use client';

import Template from '@/app/_components/Template';
import { BG_COLORS } from '@/app/_lib/configs';
import useTaskStore from '@/app/taskStore';
import { notFound, redirect, useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function Page({}) {
   const [isRedirecting, setIsRedirecting] = useState(false);

   const slugId = useParams().slug;
   const listRef = useRef(null);
   const bgColor = BG_COLORS['/slug'];

   const { deleteCategoryFromStore, tasksList, getCategoriesList } =
      useTaskStore(
         useShallow((state) => ({
            deleteCategoryFromStore: state.deleteCategoryFromStore,
            tasksList: state.tasksList,
            getCategoriesList: state.getCategoriesList,
         }))
      );

   const theCategory = getCategoriesList()?.find(
      (cat) => cat.category_id === slugId
   );

   if (!theCategory) notFound();

   const tasks = tasksList.filter(
      (task) => task.task_category_id === theCategory.category_id
   );

   useEffect(() => {
      if (listRef.current) {
         listRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [tasksList.length]);

   useEffect(() => {
      if (!theCategory && !isRedirecting) setIsRedirecting(true);
   }, [theCategory, isRedirecting]);

   const listConfig = theCategory
      ? {
           bgColor,
           listName: theCategory.category_title,
           listIcon: '',
           theCategory,
           tasks,
        }
      : null;

   async function handleDeleteCategory() {
      setIsRedirecting(true);

      // 1. Delete the category
      await deleteCategoryFromStore(theCategory.category_id);

      // 2. Redirect the url
      redirect('/tasks');
   }

   // CHANGE LATER with a real loader
   if (isRedirecting)
      return <div className='text-3xl text-center'>Redirecting...</div>;

   return (
      <Template
         listRef={listRef}
         listConfig={listConfig}
         handleDeleteCategory={handleDeleteCategory}
         theCategoryId={theCategory.category_id}
      />
   );
}
