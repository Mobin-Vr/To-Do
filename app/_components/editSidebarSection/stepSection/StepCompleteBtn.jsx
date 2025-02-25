import { getDateNowIso } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";
import {
  CircleIcon,
  CompletedIcon,
  TickCircleIcon,
} from "@/public/icons/icons";
import { useShallow } from "zustand/react/shallow";

export default function StepCompleteBtn({ task, step, className, bgColor }) {
  const { updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      updateTaskInStore: state.updateTaskInStore,
    })),
  );

  function handleCompleteClick() {
    const updatedFields = {
      is_step_completed: !step.is_step_completed,
      step_completed_at: step.is_step_completed ? null : getDateNowIso(),
    };

    updateTaskInStore(task.task_id, {
      task_steps: task.task_steps.map((theStep) =>
        theStep.step_id === step.step_id
          ? { ...theStep, ...updatedFields }
          : theStep,
      ),
    });
  }

  return (
    <button
      onClick={handleCompleteClick}
      className={`group relative cursor-default bg-transparent transition-all duration-300 ease-in-out ${className}`}
    >
      {step.is_step_completed ? (
        <span style={{ color: bgColor.iconSecondaryColor }}>
          <CompletedIcon size="16" />
        </span>
      ) : (
        <>
          <span
            className="block group-hover:hidden"
            style={{ color: bgColor.ternaryText }}
          >
            <CircleIcon size="16" />
          </span>

          <span
            className="hidden group-hover:block"
            style={{ color: bgColor.iconSecondaryColor }}
          >
            <TickCircleIcon size="16" />
          </span>
        </>
      )}
    </button>
  );
}
