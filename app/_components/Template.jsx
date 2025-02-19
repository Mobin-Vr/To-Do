import { defaultCategoryId } from "@/app/_lib/configs";
import AppHeader from "./AppHeader";
import TasksList from "./TasksList";
import TaskInput from "./taskInput/TaskInput";
import NoTaskInMyDay from "./NoTaskInMyDay";

export default function Template({
  listRef,
  listConfig,
  handleDeleteCategory,
  theCategoryId = defaultCategoryId,
  showInput = true,
}) {
  // To ensure consistent background, the body background matches the page's. Without this, border-radius on some elements would reveal the white page background at the corners.
  document.body.style.backgroundColor = listConfig.bgColor.mainBackground;

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ backgroundColor: listConfig.bgColor.mainBackground }}
    >
      <AppHeader
        className="z-10 h-36 px-6 sm:px-14"
        listConfig={listConfig}
        handleDeleteCategory={handleDeleteCategory}
        theCategoryId={theCategoryId}
        query={listConfig?.query}
      />

      <div className="my-2 h-full flex-grow overflow-auto px-6 sm:px-14">
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
          className="h-[6rem] w-[calc(100%-6px)] px-6 sm:px-14"
          bgColor={listConfig.bgColor}
          categoryId={theCategoryId}
          listName={listConfig.listName}
        />
      )}
    </div>
  );
}
