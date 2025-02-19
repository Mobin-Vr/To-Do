import TaskItem from "./TaskItem";

export default function TaskGroup({ tasks, listRef, bgColor, listName }) {
  if (tasks.length === 0) return null;

  return (
    <ul className="flex list-none flex-col gap-0.5 p-0">
      {tasks.map((task) => (
        <TaskItem
          task={task}
          listRef={listRef}
          key={task.task_id}
          bgColor={bgColor}
          listName={listName}
        />
      ))}
    </ul>
  );
}
