import { getDateNowIso } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";
import { CircleIcon, CompletedIcon, TickCircleIcon } from "@/public/icons";

export default function StepCompleteBtn({ taskId, step, className, bgColor }) {
  const updateStep = useTaskStore((state) => state.updateStep);

  function handleCompleteClick() {
    updateStep(taskId, step.step_id, {
      is_step_completed: !step.is_step_completed,
      step_completed_at: step.is_step_completed ? null : getDateNowIso(),
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
