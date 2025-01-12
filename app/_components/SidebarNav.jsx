'use client';

import React, { useEffect, useRef } from 'react';
import MenuButton from './MenuButton';
import Sidebar from './Sidebar';
import useTaskStore from '../store';

const SidebarNav = () => {
   const { isSidebarOpen, toggleSidebar } = useTaskStore();

   const sidebarRef = useRef(null);
   const menuButtonRef = useRef(null);

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

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isSidebarOpen, toggleSidebar]);

   return (
      <>
         {/* Button to toggle sidebar */}
         <MenuButton menuButtonRef={menuButtonRef} />

         {/* Sidebar */}
         <Sidebar sidebarRef={sidebarRef} />
      </>
   );
};

export default SidebarNav;
