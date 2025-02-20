"use client";

import { BG_COLORS } from "@/app/_lib/configs";
import useTaskStore from "@/app/taskStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import CloseBtn from "../_ui/CloseBtn";
import ActionFooter from "./ActionFooter";
import AddFile from "./AddFile";
import AddNote from "./AddNote";
import AddToMyDay from "./AddToMyDay";
import ReminderBox from "./reminderBox/ReminderBox";
import TaskOverView from "./TaskOverView";
import { validate } from "uuid";
import Overlay from "../_ui/Overlay";

export default function EditSidebar() {
  const pageName = usePathname().split("/").at(-1);
  const isUUID = validate(pageName);
  const bgColor = BG_COLORS[isUUID ? "/slug" : `/${pageName}`];

  const {
    isEditSidebarOpen,
    toggleEditSidebar,
    deleteTaskFromStore,
    updateNote,
    activeTask,
    setActiveTask,
    tasksList,
  } = useTaskStore(
    useShallow((state) => ({
      isEditSidebarOpen: state.isEditSidebarOpen,
      toggleEditSidebar: state.toggleEditSidebar,
      deleteTaskFromStore: state.deleteTaskFromStore,
      updateNote: state.updateNote,
      activeTask: state.activeTask,
      setActiveTask: state.setActiveTask,
      tasksList: state.tasksList,
    })),
  );

  // Refer to the comment "1"
  useEffect(() => {
    // Only update activeTask when it has changed and exists in tasksList
    if (activeTask) {
      const updatedTask = tasksList.find(
        (task) => task.task_id === activeTask.task_id,
      );

      if (updatedTask) setActiveTask(updatedTask);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksList, activeTask?.task_id]);

  // Handle outside clicks
  useEffect(() => {
    async function handleClickOutside(e) {
      if (
        isEditSidebarOpen &&
        !e.target.closest(".task-item") &&
        !e.target.closest(".edit-sidebar")
      )
        toggleEditSidebar();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleEditSidebar, isEditSidebarOpen]);

  if (!activeTask) return;

  return (
    <>
      <Overlay isOpen={isEditSidebarOpen} onClick={toggleEditSidebar} />

      <div
        className={`edit-sidebar absolute right-0 top-0 z-50 flex h-full w-4/6 transform flex-col justify-between rounded-l-md border border-gray-300 bg-sidebar-main text-sm font-light text-black shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-72 md:max-w-96 ${
          isEditSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-scroll px-3 py-3">
          <CloseBtn toggleEditSidebar={toggleEditSidebar} />

          <div className="flex flex-1 flex-col gap-2.5 justify-self-start">
            <TaskOverView task={activeTask} bgColor={bgColor} />
            <AddToMyDay task={activeTask} />
            <ReminderBox task={activeTask} />
            <AddFile />
            <AddNote
              task={activeTask}
              updateNote={updateNote}
              isEditSidebarOpen={isEditSidebarOpen}
            />
          </div>
        </div>

        <ActionFooter
          task={activeTask}
          deleteTaskFromStore={deleteTaskFromStore}
          toggleEditSidebar={toggleEditSidebar}
        />
      </div>
    </>
  );
}

/* Comments:
 * 1. Without this useEffect, activeTask would only update when toggleSidebar runs. This causes the activeTask to become stale if tasks changes elsewhere. This useEffect ensures activeTask dynamically updates whenever tasks changes, keeping the UI in sync with the latest state.
 */
