import {
  CircleIcon,
  CompletedIcon,
  TickCircleIcon,
} from "@/public/icons/icons";
import useTaskStore from "../../taskStore";
import { getDateNowIso } from "@/app/_lib/utils";
import { useShallow } from "zustand/react/shallow";

export default function CompleteBtn({ task, className, bgColor }) {
  const { updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      updateTaskInStore: state.updateTaskInStore,
    })),
  );

  const handleCompleteClick = () => {
    if (!task.is_task_completed) {
      const dingSound = new Audio("/sounds/success-sound.mp3");
      dingSound
        .play()
        .catch((error) => console.error("Failed to play sound:", error));
    }

    updateTaskInStore(task.task_id, {
      is_task_completed: !task.is_task_completed,
      task_completed_at: !task.is_task_completed ? getDateNowIso() : null,
    });
  };

  return (
    <button
      onClick={handleCompleteClick}
      className={`group relative cursor-default bg-transparent transition-all duration-200 ease-in-out ${className}`}
    >
      {task.is_task_completed ? (
        <div style={{ color: bgColor?.iconSecondaryColor }}>
          <CompletedIcon />
        </div>
      ) : (
        <>
          <span
            className="block group-hover:hidden"
            style={{ color: bgColor?.ternaryText }}
          >
            <CircleIcon />
          </span>

          <span
            className="hidden group-hover:block"
            style={{ color: bgColor?.iconSecondaryColor }}
          >
            <TickCircleIcon />
          </span>
        </>
      )}
    </button>
  );
}
