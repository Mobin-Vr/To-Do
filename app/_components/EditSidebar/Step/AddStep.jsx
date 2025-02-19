import { generateNewUuid, getDateNowIso } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";
import { CircleIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function AddStep({ task }) {
  const addStep = useTaskStore((state) => state.addStep);

  const [stepInput, setStepInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!task.task_steps) return;

  function handleSubmit(e) {
    e.preventDefault();
    if (stepInput.trim() === "") return;

    const newStep = {
      step_id: generateNewUuid(),
      step_title: stepInput,
      step_completed_at: null,
      step_created_at: getDateNowIso(),
      is_step_completed: false,
    };

    addStep(task.task_id, newStep);
    setStepInput("");
  }

  function handleFocus() {
    setIsTyping(true);
  }

  function handleBlur() {
    setIsTyping(false);
  }

  return (
    <form
      className="relative z-10 flex w-full items-center gap-2 overflow-hidden rounded-md text-sm"
      onSubmit={handleSubmit}
    >
      <span className="ml-1.5 cursor-default text-center">
        {isTyping ? (
          <CircleIcon size="15px" />
        ) : (
          <PlusIcon color="#1d4ed8" size="15px" />
        )}
      </span>

      <input
        type="text"
        value={stepInput}
        onChange={(e) => setStepInput(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full rounded-md bg-inherit p-2 pl-0 text-start text-sm font-light outline-none hover:bg-sidebar-hover focus:bg-white ${
          isTyping ? "placeholder-gray-500" : "placeholder-blue-700"
        }`}
        placeholder={task.task_steps.length > 0 ? `Add next step` : "Add step"}
      />
    </form>
  );
}
