import { FullStarIcon, StarIcon } from "@/public/icons/icons";
import useTaskStore from "../../taskStore";
import { useShallow } from "zustand/react/shallow";

export default function StarBtn({ task, starBtnRef, className, bgColor }) {
  const { updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      updateTaskInStore: state.updateTaskInStore,
    })),
  );

  return (
    <button
      ref={starBtnRef}
      className={`cursor-pointer border-none transition-colors duration-200 ${className}`}
      onClick={() =>
        updateTaskInStore(task.task_id, {
          is_task_starred: !task.is_task_starred,
        })
      }
    >
      {task.is_task_starred ? (
        <span style={{ color: bgColor.iconSecondaryColor }}>
          <FullStarIcon />
        </span>
      ) : (
        <span style={{ color: bgColor?.ternaryText }}>
          <StarIcon />
        </span>
      )}
    </button>
  );
}
