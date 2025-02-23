import { defaultCategoryId } from "@/app/_lib/configs";
import { useEffect } from "react";
import DeleteWarningModal from "./_ui/DeleteWarningModal";
import AppHeader from "./AppHeader";
import NoResults from "./NoResults";
import NoTaskInMyDay from "./NoTaskInMyDay";
import TaskInput from "./taskInputSection/TaskInput";
import TasksList from "./TasksList";
import { useState } from "react";

export default function Template({
  listRef,
  listConfig,
  handleDeleteCategory,
  theCategoryId = defaultCategoryId,
  showInput = true,
  showSearch = false,
}) {
  const [mustFocus, setMustFocus] = useState(false);

  // To ensure consistent background, the body background matches the page's. Without this, border-radius on some elements would reveal the white page background at the corners.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = listConfig.bgColor.mainBackground;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(e) {
    console.log(e.traget);
    if (
      !e.target.closest(".task-item") &&
      !e.target.closest(".app-header") &&
      !e.target.closest(".list-toggler") &&
      !e.target.closest(".task-input")
    )
      setMustFocus(true);
  }

  return (
    <div
      onClick={handleClick}
      className="relative flex h-full w-full overflow-hidden"
    >
      {/* Delete warn modal */}
      <DeleteWarningModal />
      {!showSearch ? (
        <div
          className="flex h-full w-full flex-col items-center justify-center"
          style={{ backgroundColor: listConfig.bgColor.mainBackground }}
        >
          <AppHeader
            className="app-header z-10 max-h-28 min-h-24 w-full px-8 sm:px-10"
            listConfig={listConfig}
            handleDeleteCategory={handleDeleteCategory}
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
              // Adjust width to match the task list, which has a 6px scrollbar.
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
        // this is for search componnet
        <NoResults query={listConfig.query} bgColor={listConfig.bgColor} />
      )}
    </div>
  );
}
