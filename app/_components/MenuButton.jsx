'use client';

import { MenuIcon } from '@/public/icons';
import React from 'react';
import useTaskStore from '../store';

function MenuButton({ menuButtonRef, color, className }) {
   const { toggleSidebar } = useTaskStore();

   return (
      <button
         ref={menuButtonRef}
         onClick={toggleSidebar}
         className={`text-gray-600 ease-in-out duration-30 sm:hidden ${className}`}
      >
         <MenuIcon color={color} />
      </button>
   );
}

export default MenuButton;
