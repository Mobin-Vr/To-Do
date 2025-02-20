import useTaskStore from "../taskStore";
import CompleteBtn from "./_ui/CompleteBtn";
import StarBtn from "./_ui/StarBtn";
import TaskDetails from "./TaskDetails";
import TaskTitle from "./TaskTitle";

// Define styles for the TaskItem component
const taskItemStyles = `
   .task-item {
      transition: background-color 0.2s ease-in-out;
      background-color: var(--default-bg-color);
   }

   .task-item:hover {
      background-color: var(--hover-bg-color);
   }
`;

export default function TaskItem({
  task,
  listRef,
  bgColor,
  listName,
  className,
}) {
  const handleActiveTaskSidebar = useTaskStore(
    (state) => state.handleActiveTaskSidebar,
  );

  return (
    <li
      ref={listRef}
      id={task.task_id}
      onClick={(e) => handleActiveTaskSidebar(task, e)}
      className={`task-item flex min-h-[3.25rem] flex-col justify-center rounded-md px-4 py-2 text-gray-400 ${className}`} // for click handeling
      style={{
        "--default-bg-color": bgColor.taskBackground,
        "--hover-bg-color": bgColor.taskHover,
      }}
    >
      <div className="flex items-center justify-between">
        {/* Added class to identify the buttons for click handling */}
        <CompleteBtn task={task} className="complete-btn" bgColor={bgColor} />

        <div className="flex flex-1 flex-col justify-center overflow-hidden px-2">
          <TaskTitle
            task={task}
            className="ml-0.5 break-all text-sm font-normal text-black"
          />

          <TaskDetails task={task} listName={listName} />
        </div>

        {/* Added class to identify the buttons for click handling */}
        <StarBtn task={task} className="star-btn" bgColor={bgColor} />
      </div>

      {/* Include the styles */}
      <style>{taskItemStyles}</style>
    </li>
  );
}
