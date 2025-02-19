export default function TaskTitle({ task, className }) {
  return (
    <span
      className={`${className} ${
        task.is_task_completed
          ? "decoration-slice text-gray-800 line-through decoration-gray-500 decoration-1"
          : ""
      }`}
    >
      {task.task_title}
    </span>
  );
}
