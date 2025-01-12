'use client';

import { MenuIcon } from '@/public/icons';
import React from 'react';
import useTaskStore from '../store';

function MenuButton({ menuButtonRef }) {
   const { isSidebarOpen, toggleSidebar } = useTaskStore();

   return (
      <button
         ref={menuButtonRef}
         className={`px-5 pt-3 fixed top-0.5 h-10 z-50 text-gray-600 ease-in-out duration-300 ${
            isSidebarOpen ? 'px-[0.9rem]' : ''
         }`}
         onClick={toggleSidebar}
      >
         <MenuIcon />
      </button>
   );
}

export default MenuButton;
