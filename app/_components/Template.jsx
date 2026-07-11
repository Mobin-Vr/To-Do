"use client";

import { defaultCategoryId } from "@/app/_lib/configs";
import { useEffect, useState } from "react";
import DeleteWarningModal from "./_ui/DeleteWarningModal";
import ListHeader from "./ListHeader";
import NoResults from "./NoResults";
import NoTaskInMyDay from "./NoTaskInMyDay";
import TaskInput from "./taskInputSection/TaskInput";
import TasksList from "./TasksList";
import useCategoryStore from "@/app/_store/useCategoryStore";
import { useShallow } from "zustand/react/shallow";

export default function Template({
  listRef,
  listConfig,
  handleDeleteCategory,
  handleLeaveInvitation,
  theCategoryId = defaultCategoryId,
  showInput = true,
  showSearch = false,
}) {
  const [mustFocus, setMustFocus] = useState(false);

  // Track initial data load – categoriesList is null until store is hydrated
  const { categoriesList } = useCategoryStore(
    useShallow((state) => ({ categoriesList: state.categoriesList })),
  );

  // Auto-focus the task input on page load so the user can start typing immediately.
  useEffect(() => {
    const timer = setTimeout(() => setMustFocus(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup body background on unmount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const originalBg = document.body.style.backgroundColor;
      document.body.style.backgroundColor = listConfig.bgColor.mainBackground;
      return () => {
        document.body.style.backgroundColor = originalBg;
      };
    }
  }, [listConfig.bgColor.mainBackground]);

  function handleClick(e) {
    if (
      !e.target.closest(".task-item") &&
      !e.target.closest(".app-header") &&
      !e.target.closest(".list-toggler") &&
      !e.target.closest(".task-input")
    )
      setMustFocus(true);
  }

  // While the initial data is still loading, render nothing to prevent flicker
  if (categoriesList === null) return null;

  return (
    <div
      onClick={handleClick}
      className="relative flex h-full w-full overflow-hidden"
    >
      <DeleteWarningModal />

      {!showSearch ? (
        <div
          className="flex h-full w-full flex-col items-center justify-center"
          style={{ backgroundColor: listConfig.bgColor.mainBackground }}
        >
          <ListHeader
            className="app-header z-10 max-h-28 min-h-24 w-full px-8 sm:px-10"
            listConfig={listConfig}
            handleDeleteCategory={handleDeleteCategory}
            handleLeaveInvitation={handleLeaveInvitation}
            theCategoryId={theCategoryId}
          />

          <div className="mb-2 mt-4 w-full flex-grow overflow-auto px-8 sm:px-10 md:mt-0">
            {listConfig.tasks.length > 0 ? (
              <TasksList
                listRef={listRef}
                bgColor={listConfig.bgColor}
                categoryId={theCategoryId}
                tasks={listConfig.tasks}
                listName={listConfig.listName}
                query={listConfig?.query}
                setMustFocus={setMustFocus}
              />
            ) : (
              listConfig.listName === "My Day" && <NoTaskInMyDay />
            )}
          </div>

          {showInput && (
            <TaskInput
              className="task-input min-h-[5rem] w-[calc(100%-6px)] -translate-x-[3px] px-8 sm:px-10"
              bgColor={listConfig.bgColor}
              categoryId={theCategoryId}
              listName={listConfig.listName}
              setMustFocus={setMustFocus}
              mustFocus={mustFocus}
            />
          )}
        </div>
      ) : (
        <NoResults query={listConfig.query} bgColor={listConfig.bgColor} />
      )}
    </div>
  );
}
