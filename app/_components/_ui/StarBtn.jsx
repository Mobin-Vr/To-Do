import { FullStarIcon, StarIcon } from "@/public/icons";
import useTaskStore from "../../taskStore";

export default function StarBtn({ task, starBtnRef, className, bgColor }) {
  const toggleStarred = useTaskStore((state) => state.toggleStarred);

  return (
    <button
      ref={starBtnRef}
      className={`cursor-pointer border-none transition-colors duration-200 ${className}`}
      onClick={() => toggleStarred(task.task_id)}
    >
      {task.is_task_starred ? (
        <span style={{ color: bgColor.iconSecondaryColor }}>
          <FullStarIcon />
        </span>
      ) : (
        <span style={{ color: bgColor.ternaryText }}>
          <StarIcon />
        </span>
      )}
    </button>
  );
}
