"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useTaskStore from "@/app/taskStore";
import { defaultCategoryId } from "@/app/_lib/configs";
import { UsersIcon } from "@/public/icons/icons";
import { useShallow } from "zustand/react/shallow";

const SidebarLink = ({
  href,
  title,
  children,
  categoryId,
  onClick,
  hasCollab,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const { tasksList } = useTaskStore(
    useShallow((state) => ({
      tasksList: state.tasksList,
    })),
  );

  function count() {
    if (!tasksList) return 0;

    if (title === "My Day")
      return tasksList.filter((task) => task.is_task_in_myday).length;

    if (title === "Important")
      return tasksList.filter((task) => task.is_task_starred).length;

    if (title === "Planned")
      return tasksList.filter(
        (task) =>
          task.is_task_in_myday || task.task_reminder || task.task_due_date,
      ).length;

    if (title === "All") return tasksList.length;

    if (title === "Completed")
      return tasksList.filter((task) => task.is_task_completed).length;

    if (title === "Tasks")
      return tasksList.filter(
        (task) => task.task_category_id === defaultCategoryId,
      ).length;

    if (categoryId !== defaultCategoryId)
      return tasksList.filter((task) => task.task_category_id === categoryId)
        .length;
  }

  return (
    <Link href={href} onClick={onClick}>
      <li
        className={`relative flex items-center justify-between px-3 py-2 text-[0.95rem] font-normal text-gray-700 transition-all duration-300 hover:rounded-lg hover:bg-sidebar-hover ${
          isActive ? "rounded-md bg-sidebar-hover" : ""
        }`}
      >
        <div className="mr-2 flex w-4/5 items-center justify-start gap-2 overflow-hidden">
          <div className="flex aspect-square h-5 items-center justify-center">
            {children}
          </div>
          <p className="overflow-hidden text-ellipsis text-nowrap">{title}</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          {hasCollab && (
            <span className="ml-1 text-gray-500">
              <UsersIcon color="#999" size="16px" />
            </span>
          )}

          <span className="flex h-5 w-fit min-w-5 items-center justify-center rounded-full bg-blue-100 px-2 pt-0.5 text-[0.7rem] font-extralight leading-none text-gray-500">
            {count()}
          </span>
        </div>

        {isActive && (
          <div className="absolute left-0 h-[50%] rounded-md border-l-[3px] border-blue-500"></div>
        )}
      </li>
    </Link>
  );
};

export default SidebarLink;
