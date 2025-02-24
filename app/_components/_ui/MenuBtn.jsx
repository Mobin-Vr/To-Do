"use client";

import { MenuIcon } from "@/public/icons/icons";
import React, { useState } from "react";
import useTaskStore from "../../taskStore";
import { useShallow } from "zustand/react/shallow";

function MenuBtn({ menuButtonRef, className, bgColor }) {
  const [hover, setHover] = useState(false);

  const { toggleSidebar, isSidebarOpen } = useTaskStore(
    useShallow((state) => ({
      toggleSidebar: state.toggleSidebar,
      isSidebarOpen: state.isSidebarOpen,
    })),
  );

  return (
    <button
      ref={menuButtonRef}
      onClick={toggleSidebar}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex items-center justify-center rounded-md p-1 duration-300 ease-in-out md:hidden ${className}`}
      style={{
        color: bgColor?.primaryText,
        backgroundColor: hover
          ? isSidebarOpen
            ? "#d2d5db"
            : bgColor.buttonHover
          : "transparent",
      }}
    >
      <MenuIcon />
    </button>
  );
}

export default MenuBtn;
