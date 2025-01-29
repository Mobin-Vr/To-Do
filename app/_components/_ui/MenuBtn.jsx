'use client';

import { MenuIcon } from '@/public/icons';
import React from 'react';
import useTaskStore from '../../taskStore';
import { useShallow } from 'zustand/react/shallow';

function MenuBtn({ menuButtonRef, color, className }) {
   const { toggleSidebar, isSidebarOpen } = useTaskStore(
      useShallow((state) => ({
         toggleSidebar: state.toggleSidebar,
         isSidebarOpen: state.isSidebarOpen,
      }))
   );

   return (
      <button
         ref={menuButtonRef}
         onClick={toggleSidebar}
         style={{ color: color }}
         className={`ease-in-out duration-30 sm:hidden p-1 rounded-sm flex items-center justify-center ${className} ${
            isSidebarOpen ? 'hover:bg-accent-50' : 'hover:bg-gray-300'
         }`}
      >
         <MenuIcon />
      </button>
   );
}

export default MenuBtn;
