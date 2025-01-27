'use client';

import Template from '@/app/_components/_ui/Template';
import { BG_COLORS } from '@/app/_lib/utils';
import useTaskStore from '@/app/store';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function Page({}) {
   const [isRedirecting, setIsRedirecting] = useState(false);

   const router = useRouter();
   const id = useParams().slug;
   const listRef = useRef(null);
   const bgColor = BG_COLORS['/slug'];

   const {
      deleteCategoryFromStore,
      tasksList,
      categoriesList,
      deleteTasksByCategory,
   } = useTaskStore(
      useShallow((state) => ({
         deleteCategoryFromStore: state.deleteCategoryFromStore,
         tasksList: state.tasksList,
         categoriesList: state.categoriesList,
         deleteTasksByCategory: state.deleteTasksByCategory,
      }))
   );

   const theCategory = categoriesList?.find((cat) => cat.id === id);

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
           listName: theCategory.title,
           listIcon: '',
           theCategory,
        }
      : null;

   async function handleDeleteCategory() {
      setIsRedirecting(true);

      // 1. If the category has task delete them
      await deleteTasksByCategory(theCategory.id);

      // 2. Delete the category
      await deleteCategoryFromStore(theCategory.id);

      // 3. Redirect the url
      router.push('/tasks');
   }

   // CHANGE LATER with a real loader
   if (isRedirecting)
      return <div className='text-3xl text-center'>Redirecting...</div>;

   return (
      <Template
         listRef={listRef}
         listConfig={listConfig}
         handleDeleteCategory={handleDeleteCategory}
      />
   );
}
