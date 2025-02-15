'use client';

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useRef } from 'react';

import { DEFAULT_COLOR } from '@/app/_lib/configs';
import useTaskStore from '@/app/taskStore';
import { useShallow } from 'zustand/react/shallow';
import MenuBtn from '../_ui/MenuBtn';
import NewListBtn from '../_ui/NewListBtn';
import CategoriesList from './CategoriesList';
import SidebarNav from './SidebarNav';
import TaskSearch from './TaskSearch';
import UserMenu from './UserMenu';

export default function Sidebar() {
   const sidebarRef = useRef(null);
   const menuButtonRef = useRef(null);
   const { user } = useUser();

   const {
      isSidebarOpen,
      toggleSidebar,
      tasksList,
      categoriesList,
      getUserInfo,
      addCategoryToStore,
   } = useTaskStore(
      useShallow((state) => ({
         isSidebarOpen: state.isSidebarOpen,
         toggleSidebar: state.toggleSidebar,
         tasksList: state.tasksList,
         categoriesList: state.categoriesList,
         getUserInfo: state.getUserInfo,
         addCategoryToStore: state.addCategoryToStore,
      }))
   );

   console.log('sidebar');

   // Handle clicks outside of the sidebar and menu button
   useEffect(() => {
      function handleClickOutside(event) {
         if (
            isSidebarOpen &&
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            menuButtonRef.current &&
            !menuButtonRef.current.contains(event.target)
         )
            toggleSidebar();
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () =>
         document.removeEventListener('mousedown', handleClickOutside);
   }, [isSidebarOpen, toggleSidebar]);

   async function createClerkPasskey() {
      try {
         await user?.createPasskey();
      } catch (err) {
         console.error('Error:', JSON.stringify(err, null, 2));
      }
   }

   return (
      <div
         ref={sidebarRef}
         className={`fixed top-0 left-0 bottom-0 w-3/5 bg-gray-50 text-black py-6 px-4 transform transition-transform ease-in-out duration-300 flex flex-col justify-between sm:translate-x-0 sm:static md:max-w-72 sm:max-w-64 z-20 h-full shadow-2xl border border-gray-300 rounded-md ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
         }`}
      >
         <div>
            <MenuBtn
               menuButtonRef={menuButtonRef}
               className='-translate-x-1 -translate-y-1'
               bgColor={DEFAULT_COLOR}
            />

            <UserMenu
               className={'mt-2 mb-3'}
               user={user}
               createClerkPasskey={createClerkPasskey}
            />

            <TaskSearch />

            <nav className='sidebar overflow-y-auto max-h-[calc(100vh-200px)] pb-4 relative'>
               <SidebarNav
                  tasksList={tasksList}
                  toggleSidebar={toggleSidebar}
               />

               <CategoriesList
                  categoriesList={categoriesList}
                  toggleSidebar={toggleSidebar}
               />
            </nav>
         </div>

         <div className='sticky bottom-0 bg-gray-50 border-t border-t-gray-200 w-full'>
            <NewListBtn
               getUserInfo={getUserInfo}
               addCategoryToStore={addCategoryToStore}
            />
         </div>
      </div>
   );
}
