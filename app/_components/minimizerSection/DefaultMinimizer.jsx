import { useMemo } from "react";
import { sortTasks } from "../../_lib/utils";
import TaskGroup from "../TaskGroup";
import TasksMinimizer from "./TasksMinimizer";

export default function DefaultMinimizer({
  tasks,
  listRef,
  bgColor,
  sortMethod,
  listName,
  isVisibleByDefault,
}) {
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.is_task_completed),
    [tasks],
  );

  const uncompletedTasks = useMemo(
    () => tasks.filter((task) => !task.is_task_completed),
    [tasks],
  );

  const sortedCompletedTasks = useMemo(
    () => sortTasks(completedTasks, sortMethod),
    [completedTasks, sortMethod],
  );

  const sortedUncompletedTasks = useMemo(
    () => sortTasks(uncompletedTasks, sortMethod),
    [uncompletedTasks, sortMethod],
  );

  return (
    <>
      <TaskGroup
        tasks={sortedUncompletedTasks}
        listRef={listRef}
        bgColor={bgColor}
        listName={listName}
      />

      {completedTasks.length > 0 && listName !== "Important" && (
        <TasksMinimizer
          TogglerName="Completed"
          tasks={sortedCompletedTasks}
          listRef={listRef}
          bgColor={bgColor}
          isVisibleByDefault={isVisibleByDefault}
          listName={listName}
        />
      )}
    </>
  );
}
