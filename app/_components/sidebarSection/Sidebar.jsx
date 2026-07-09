"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

import { BG_COLORS, RELEVENT_APP_PAGES } from "@/app/_lib/configs";
import useUiStore from "@/app/_store/useUiStore";
import useTaskStore from "@/app/_store/useTaskStore";
import useCategoryStore from "@/app/_store/useCategoryStore";
import useUserStore from "@/app/_store/useUserStore";
import { usePathname } from "next/navigation";
import { validate } from "uuid";
import { useShallow } from "zustand/react/shallow";
import MenuBtn from "../_ui/MenuBtn";
import NewListBtn from "../_ui/NewListBtn";
import Overlay from "../_ui/Overlay";
import CategoriesList from "./CategoriesList";
import SidebarNav from "./SidebarNav";
import TaskSearch from "./TaskSearch";
import UserMenu from "./UserMenu";

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const { user } = useUser();

  const pathName = usePathname().split("/").at(-1);
  const isUUID = validate(pathName);
  const pageName = isUUID ? "slug" : pathName;

  const { isSidebarOpen, toggleSidebar } = useUiStore(
    useShallow((state) => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
    })),
  );
  const { tasksList } = useTaskStore(
    useShallow((state) => ({
      tasksList: state.tasksList,
    })),
  );
  const { categoriesList, addCategoryToStore } = useCategoryStore(
    useShallow((state) => ({
      categoriesList: state.categoriesList,
      addCategoryToStore: state.addCategoryToStore,
    })),
  );
  const { getUserState } = useUserStore(
    useShallow((state) => ({
      getUserState: state.getUserState,
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

  if (!user) return null;

  const isAtaskPage = RELEVENT_APP_PAGES.some((page) => page === pageName);
  if (!isAtaskPage) return;

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
        className={`absolute bottom-0 left-0 top-0 z-30 flex w-4/5 max-w-80 transform flex-col justify-between overflow-hidden rounded-r-md border border-gray-300 bg-sidebar-main px-4 pt-6 text-black shadow-2xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1">
          <MenuBtn
            menuButtonRef={menuButtonRef}
            className="-translate-x-1 -translate-y-1"
            bgColor={BG_COLORS["/default"]}
          />

          <UserMenu className="mb-3 mt-2" user={user} />

          <TaskSearch />

          <nav className="sidebar h-[calc(100svh-14.2rem)] overflow-y-scroll">
            <SidebarNav tasksList={tasksList} toggleSidebar={toggleSidebar} />

            <CategoriesList
              categoriesList={categoriesList}
              toggleSidebar={toggleSidebar}
            />
          </nav>
        </div>

        <div className="mt-3 w-full border-t border-t-gray-200">
          <NewListBtn
            getUserState={getUserState}
            addCategoryToStore={addCategoryToStore}
          />
        </div>
      </div>
    </>
  );
}