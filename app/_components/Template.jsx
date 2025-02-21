import { defaultCategoryId } from "@/app/_lib/configs";
import AppHeader from "./AppHeader";
import EditSidebar from "./EditSidebar/EditSidebar";
import NoTaskInMyDay from "./NoTaskInMyDay";
import TasksList from "./TasksList";
import Sidebar from "./menuSidebar/Sidebar";
import TaskInput from "./taskInput/TaskInput";
import { useEffect } from "react";
import DeleteWarningModal from "./_ui/DeleteWarningModal";

export default function Template({
  listRef,
  listConfig,
  handleDeleteCategory,
  theCategoryId = defaultCategoryId,
  showInput = true,
}) {
  // To ensure consistent background, the body background matches the page's. Without this, border-radius on some elements would reveal the white page background at the corners.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = listConfig.bgColor.mainBackground;
    }
  }, []);

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      {/* Absolute Sidebar */}
      <Sidebar />

      {/* Absolute Editsidebar */}
      <EditSidebar />

      {/* Delete warn modal */}
      <DeleteWarningModal />

      <div
        className="flex h-full w-full flex-col items-center justify-center"
        style={{ backgroundColor: listConfig.bgColor.mainBackground }}
      >
        <AppHeader
          className="z-10 h-36 w-full px-8 sm:px-10"
          listConfig={listConfig}
          handleDeleteCategory={handleDeleteCategory}
          theCategoryId={theCategoryId}
          query={listConfig?.query}
        />

        <div className="my-2 w-full flex-grow overflow-auto px-8 sm:px-10">
          {listConfig.tasks.length > 0 ? (
            <TasksList
              listRef={listRef}
              bgColor={listConfig.bgColor}
              categoryId={theCategoryId}
              tasks={listConfig.tasks}
              listName={listConfig.listName}
              query={listConfig?.query}
            />
          ) : (
            listConfig.listName === "My Day" && <NoTaskInMyDay />
          )}
        </div>

        {showInput && (
          <TaskInput
            // Adjust width to match the task list, which has a 6px scrollbar.
            className="min-h-[5rem] w-[calc(100%-6px)] -translate-x-[3px] px-8 sm:px-10"
            bgColor={listConfig.bgColor}
            categoryId={theCategoryId}
            listName={listConfig.listName}
          />
        )}
      </div>
    </div>
  );
}
