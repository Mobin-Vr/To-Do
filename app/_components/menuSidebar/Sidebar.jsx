"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

import { BG_COLORS } from "@/app/_lib/configs";
import useTaskStore from "@/app/taskStore";
import { useShallow } from "zustand/react/shallow";
import MenuBtn from "../_ui/MenuBtn";
import NewListBtn from "../_ui/NewListBtn";
import CategoriesList from "./CategoriesList";
import SidebarNav from "./SidebarNav";
import TaskSearch from "./TaskSearch";
import UserMenu from "./UserMenu";
import Overlay from "../_ui/Overlay";

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { user } = useUser();
  const bgColor = BG_COLORS["/default"];

  const {
    isSidebarOpen,
    toggleSidebar,
    tasksList,
    categoriesList,
    getUserState,
    addCategoryToStore,
  } = useTaskStore(
    useShallow((state) => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
      tasksList: state.tasksList,
      categoriesList: state.categoriesList,
      getUserState: state.getUserState,
      addCategoryToStore: state.addCategoryToStore,
    })),
  );

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

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, toggleSidebar]);

  async function createClerkPasskey() {
    try {
      await user?.createPasskey();
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  }

  return (
    <>
      <Overlay
        isOpen={isSidebarOpen}
        onClick={toggleSidebar}
        className="sm:hidden"
        zIndex={30}
      />

      <div
        ref={sidebarRef}
        className={`absolute left-0 top-0 z-30 flex h-full w-3/5 max-w-72 transform flex-col justify-between rounded-r-md border border-gray-300 bg-sidebar-main px-4 py-6 text-black shadow-2xl transition-transform duration-300 ease-in-out md:static md:max-w-80 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <MenuBtn
            menuButtonRef={menuButtonRef}
            className="-translate-x-1 -translate-y-1"
            bgColor={bgColor}
          />

          <UserMenu
            className={"mb-3 mt-2"}
            user={user}
            createClerkPasskey={createClerkPasskey}
          />

          <TaskSearch />

          <nav className="sidebar relative max-h-[calc(100vh-200px)] overflow-y-auto pb-4">
            <SidebarNav tasksList={tasksList} toggleSidebar={toggleSidebar} />

            <CategoriesList
              categoriesList={categoriesList}
              toggleSidebar={toggleSidebar}
            />
          </nav>
        </div>

        <div className="sticky bottom-0 w-full border-t border-t-gray-200 bg-gray-50">
          <NewListBtn
            getUserState={getUserState}
            addCategoryToStore={addCategoryToStore}
          />
        </div>
      </div>
    </>
  );
}
