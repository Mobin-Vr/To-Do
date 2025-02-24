"use client";

import { useShallow } from "zustand/react/shallow";
import { defaultCategoryId } from "../_lib/configs";
import useTaskStore from "../taskStore";
import AllMinimizer from "./minimizerSection/AllMinimizer";
import DefaultMinimizer from "./minimizerSection/DefaultMinimizer";
import PlannedMinimizer from "./minimizerSection/PlannedMinimizer";
import TaskGroup from "./TaskGroup";

export default function TasksList({
  listRef,
  bgColor,
  categoryId,
  tasks,
  listName,
}) {
  const { sortMethod, sortMethodForShared, getCategoriesList } = useTaskStore(
    useShallow((state) => ({
      sortMethod: state.sortMethod,
      sortMethodForShared: state.sortMethodForShared,
      getCategoriesList: state.getCategoriesList,
    })),
  );

  if (tasks?.length === 0 && categoryId) return null;

  const cond =
    listName === "Tasks" ||
    listName === "My Day" ||
    categoryId !== defaultCategoryId;

  return (
    <div className="w-full">
      {cond && (
        <DefaultMinimizer
          tasks={tasks}
          listRef={listRef}
          bgColor={bgColor}
          listName={listName}
          sortMethod={
            categoryId === defaultCategoryId ? sortMethod : sortMethodForShared
          }
        />
      )}

      {listName === "Search" && (
        <DefaultMinimizer
          tasks={tasks}
          listRef={listRef}
          bgColor={bgColor}
          sortMethod={sortMethod}
          isVisibleByDefault={true}
          listName={listName}
        />
      )}

      {listName === "Planned" && (
        <PlannedMinimizer
          tasks={tasks}
          listRef={listRef}
          bgColor={bgColor}
          listName={listName}
        />
      )}

      {(listName === "All" || listName === "Completed") && (
        <AllMinimizer
          tasks={tasks}
          listRef={listRef}
          bgColor={bgColor}
          getCategoriesList={getCategoriesList}
          listName={listName}
        />
      )}

      {listName === "Important" && (
        // No need to minimizer for important tasks
        <TaskGroup
          tasks={tasks}
          listRef={listRef}
          bgColor={bgColor}
          listName={listName}
        />
      )}
    </div>
  );
}
